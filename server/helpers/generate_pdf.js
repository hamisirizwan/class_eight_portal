const util = require('util');
const ejs = require('ejs');
const fs = require('fs');
const express = require('express');
const path = require('path');
const puppeteer = require('puppeteer');


const renderFile = util.promisify(ejs.renderFile);


async function generatePDF(
	printData,req,res
) {
	try {

        let fileClassName = "student_report"
        let fileName = "brightstart_reports"
		const unlink = util.promisify(fs.unlink);
		const templateFile = "student_report.ejs";
		const templateName = templateFile.split('.')[0];
		const templatePath = path.join(__dirname, `./reports/${templateFile}`);
		const htmlFilePath = path.join(
			__dirname,
			`./reports/${templateName}.html`
		);
		const pdfFilePath = path.join(
			__dirname,
			`./reports/${templateName + '_' + Date.now()}.pdf`
		);

		// Render the template
		const html = await renderFile(templatePath, {
			data: printData,
		});

		// Write the html to a file but in stream mode to avoid memory issues
		const htmlStream = fs.createWriteStream(htmlFilePath);
		htmlStream.write(html);
		htmlStream.end();

		// Launch Puppeteer
		const browser = await puppeteer.launch({
			args: [
				'--no-sandbox',
				'--disable-setuid-sandbox',
				'--disable-web-security'
			]
		});

		const page = await browser.newPage();

		try {
			// Read the html file and set it as the content of the page
			const htmlFileStats = await fs.promises.stat(htmlFilePath);
			const htmlFileSize = htmlFileStats.size;

			let htmlData = null;

			const oneMB = 1028 * 1028;
			if (htmlFileSize > oneMB) {
				// Read the file in chunks
				const htmlFile = fs.createReadStream(htmlFilePath, 'utf8');
				htmlData = await new Promise((resolve, reject) => {
					let data = '';
					htmlFile.on('data', (chunk) => {
						data += chunk;
					});
					htmlFile.on('end', () => {
						resolve(data);
					});
					htmlFile.on('error', (error) => {
						reject(error);
					});
				});
			} else {
				// Read the file in one go
				htmlData = await fs.promises.readFile(htmlFilePath, 'utf8');
			}

			// console.log("htmlData: ", htmlData);

			await page.setContent(htmlData, {
				waitUntil: 'domcontentloaded',
				timeout: 0
			});
			console.log('fileClassName: ', fileClassName);
			await page.$eval(`.${fileClassName}`, (el) => {
				// console.log("el: ", el);
				return Array.from(el.children).map((child) => {
					// console.log("child: ", child);
					return child.outerHTML;
				});
			});

			let margin = {
				right: '0.0in',
				left: '0.0in',
				top: '0.0in',
				bottom: '0.0in'
			};

			await page.pdf({
				path: pdfFilePath,
				format: 'A4',
				printBackground: true,
				margin,
				// prevent a timeout error
				timeout: 0,
				landscape: false,
				displayHeaderFooter: true,
				footerTemplate: `<div>BrightStar Academy</div>`
			});
			fileName = fileName.replace(/\s+/g, '-');
			console.log(`Incoming file name: ${fileName}-${templateName}`);
			// stream the pdf to the client with all the necessary headers
			const fileStats = await fs.promises.stat(pdfFilePath);
			res.setHeader('Content-Type', 'application/pdf');
			res.setHeader(
				'Content-Disposition',
				`attachment; filename=${fileName}-${templateName}_${Date.now()}.pdf`
			);
			res.setHeader('Content-Length', fileStats.size);
			res.setHeader(
				'Cache-Control',
				'no-cache, no-store, must-revalidate'
			);

			const fileStream = fs.createReadStream(pdfFilePath);

			fileStream.on('data', (chunk) => {
				res.write(chunk);
			});

			fileStream.on('end', async () => {
				res.end();

				// Delete the html and pdf files
				await unlink(htmlFilePath);
				await unlink(pdfFilePath);
			});
		} finally {
			// Close the browser even if there is an error
			await page.close();
			await browser.close();
		}
	} catch (error) {
		const errorMessage = error.message;
		console.log('Error generating exam PDF: ', error);
		return res.status(500).send(
			errorMessage
		);
	}
}

module.exports = generatePDF;
