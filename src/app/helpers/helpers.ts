import * as printJS from 'print-js';
import * as XLSX from 'xlsx';
declare var jsPDF: any;
import { ElementRef } from '@angular/core';
import { DataTablesModule } from 'angular-datatables';
declare var document: any;

export const downloadCSV = (csv, filename) => {
    let csvFile;
    let downloadLink;

    // CSV file
    csvFile = new Blob([csv], { type: 'text/csv' });

    // Download link
    downloadLink = document.createElement('a');

    // File name
    downloadLink.download = filename;

    // Create a link to the file
    downloadLink.href = window.URL.createObjectURL(csvFile);

    // Hide download link
    downloadLink.style.display = 'none';

    // Add the link to DOM
    document.body.appendChild(downloadLink);

    // Click download link
    downloadLink.click();
};

export const downloadXLSX = (xlsx, filename) => {
    let xlsxFile;
    let downloadLink;

    // CSV file
    xlsxFile = new Blob([xlsx], { type: 'application/octet-stream' });

    // Download link
    downloadLink = document.createElement('a');

    // File name
    downloadLink.download = filename;

    // Create a link to the file
    downloadLink.href = window.URL.createObjectURL(xlsxFile);

    // Hide download link
    downloadLink.style.display = 'none';

    // Add the link to DOM
    document.body.appendChild(downloadLink);

    // Click download link
    downloadLink.click();
};

export const exportTableToCSV = (dados: any[]) => {
    const csv = [];
    dados.forEach((data, index) => {
        const row = [];
        for (const campo in data) {
            if (data.hasOwnProperty(campo)) {
                const element = data[campo];
                row.push(element);
            }
        }
        csv.push(row.join(';'));
    });

    // Download CSV file
    downloadCSV(csv.join('\n'), 'dados.csv');
};


export const exportTableToXLSX = (dados: any[]) => {

    const wb = XLSX.utils.book_new();

    const ws = XLSX.utils.json_to_sheet(dados, { skipHeader: true });
    XLSX.utils.book_append_sheet(wb, ws, 'No Header');

    const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });

    downloadXLSX(wbout, 'dados.xlsx');
};

export const exportHTMLToPdf = (dados: any[], titulos: string[], returnContent: boolean) => {

    const linhas = dados.map((dado) => {
        const row = [];
        for (const campo in dado) {
            if (dado.hasOwnProperty(campo)) {
                const element = dado[campo];
                row.push(element);
            }
        }

        // row.push(dado.dataEntrada.toString());
        // row.push(dado.vaga.numero.toString());
        // row.push(dado.cliente.placa.toString());
        // row.push(Number(dado.valorTotal).toFixed(2));
        return row;
    });

    const doc = new jsPDF();
    doc.autoTable({
        head: [titulos],
        body: linhas
    });
    if (returnContent) {
        let file: string = doc.output('datauristring');

        file = file.replace('data:application/pdf;filename=generated.pdf;base64,', '');
        return file;
    } else {
        doc.save('dados.pdf');
    }
};

export const printToPdf = (base64String: string) => {
    printJS({ printable: base64String, type: 'pdf', base64: true });
};


export const goInFullscreen = (element) => {
    if (element.requestFullscreen) {
        element.requestFullscreen();
    } else if (element.mozRequestFullScreen) {
        element.mozRequestFullScreen();
    } else if (element.webkitRequestFullscreen) {
        element.webkitRequestFullscreen();
    } else if (element.msRequestFullscreen) {
        element.msRequestFullscreen();
    }
};

/* Get out of full screen */
export const GoOutFullscreen = () => {

    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.mozCancelFullScreen) {
        document.moz.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
    }
};

/* Is currently in full screen or not */
export const IsFullScreenCurrently = () => {
    const fullScreenElement = document.fullscreenElement || document.webkitFullscreenElement ||
        document.mozFullScreenElement || document.msFullscreenElement || null;

    // If no element is in full-screen
    if (fullScreenElement === null) {
        return false;
    } else {
        return true;
    }
};

