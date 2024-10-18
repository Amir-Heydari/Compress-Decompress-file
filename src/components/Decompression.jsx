import React, { useState } from 'react'
import { deCompressUsingLZW } from '../tools/compressor';

function Decompression() {

    const [unCompressedFile, setUnCompressedFile] = useState()
    const [unCompressedFileSize, setUnCompressedFileSize] = useState()

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (event) => {
            const fileContent = new Uint8Array(event.target.result);
            // converting file to byte array
            const uncompressedData = deCompressUsingLZW(fileContent) // uncompress using LZW
            

            const uncompressedDataSize = new Blob([JSON.stringify(uncompressedData)]).size
            setUnCompressedFileSize(uncompressedDataSize)

            const uncompressedBlob = new Blob([JSON.stringify(uncompressedData)], { type: file.type });
            setUnCompressedFile(uncompressedBlob);
        };

        reader.readAsArrayBuffer(file);
    }

    const downloadFile = () => {
        if (!unCompressedFile) return;

        // Create a link element, set it to the object URL, and trigger download
        const link = document.createElement('a');
        link.href = URL.createObjectURL(unCompressedFile);
        link.download = 'compressedFile.txt'; // Set a name for the downloaded file
        document.body.appendChild(link);
        link.click();

        // Clean up the URL object after the download is triggered
        document.body.removeChild(link);
        URL.revokeObjectURL(link.href);
    }
    return (
        <div>
            <h3>Decompression Mode</h3>

            <input type="file" onChange={handleFileChange} />
            {unCompressedFile && (
                <div>
                    {/* <p>Uncompressed Size: {unCompressedFile} bytes</p> */}
                    <button onClick={downloadFile}>Download Uncompressed file</button>
                </div>
            )}
        </div>
    )
}

export default Decompression
