import { useState } from 'react'
import { compressUsingLZW, lz77Compress } from '../tools/compressor';

function Compression() {

    const [compressedFile, setCompressedFile] = useState(null);
    const [originalSize, setOriginalSize] = useState(0);
    const [compressedSize, setCompressedSize] = useState(0);
    const [compressRatio, setCompressRatio] = useState(0);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (event) => {
            const fileContent = new Uint8Array(event.target.result);
            // converting file to byte array

            // const compressedData = lz77Compress(fileContent); // compress using LZ77
            const compressedData = compressUsingLZW(fileContent) // compress using LZW

            const compressedDataSize = new Blob([JSON.stringify(compressedData)]).size

            setOriginalSize(file.size);
            setCompressedSize(compressedDataSize);
            setCompressRatio(((file.size - compressedDataSize) / file.size) * 100)

            const compressedBlob = new Blob([JSON.stringify(compressedData)], { type: file.type });
          
            setCompressedFile(compressedBlob);

        };

        reader.readAsArrayBuffer(file);
    };

    const downloadFile = () => {
        if (!compressedFile) return;

        // Create a link element, set it to the object URL, and trigger download
        const link = document.createElement('a');
        link.href = URL.createObjectURL(compressedFile);
        link.download = 'compressedFile.txt'; // Set a name for the downloaded file
        document.body.appendChild(link);
        link.click();

        // Clean up the URL object after the download is triggered
        document.body.removeChild(link);
        URL.revokeObjectURL(link.href);
    };
    return (
        <div>
            <h3>Compression Mode</h3>


            <input type="file" onChange={handleFileChange} />
            {compressedFile && (
                <div>
                    <p>Original Size: {originalSize} bytes</p>
                    <p>Compressed Size: {compressedSize} bytes</p>
                    <p>Compress Ratio: {compressRatio}%</p>
                    <button onClick={downloadFile}>Download Compressed file</button>
                </div>
            )}
        </div>
    )
}

export default Compression
