const FileUpload = ({ onFileChange }) => {

    const resetInput = e => {
        if (e) {
            debugger;
            e.target.value = "";
        }
    }

    const handleChange = e => {
        const fileReader = new FileReader();
        fileReader.readAsText(e.target.files[0], "UTF-8");
        fileReader.onload = e => {
            console.log("e.target.result", e.target.result);
            onFileChange(e.target.result);
        };
    };
    return (
        <div>
            <h1>Upload Json file</h1>
            <input type="file" onClick={resetInput} onChange={handleChange} />
            <br /><br />
        </div>
    );
}
export default FileUpload