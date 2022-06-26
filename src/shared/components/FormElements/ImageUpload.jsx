import React, {useRef, useState, useEffect} from "react";
import Button from "./Button"

import './ImageUpload.css'

const ImageUpload = props => {
    const [file, setFile] = useState();
    const [perviewUrl, setPerviewUrl] = useState();
    const [isValid, setIsValid] = useState();

    const filePickerRef = useRef();

    useEffect(() => {
        if(!file) return
        const fileReader = new FileReader();
        fileReader.onload = () => setPerviewUrl(fileReader.result);
        fileReader.readAsDataURL(file);
    }, [file]);

    const pickedHandler = event => {
        let pickedFile;
        let fileisValid;

        if(event.target.files && event.target.files.length > 0){
            [pickedFile] = event.target.files;
            setFile(pickedFile);
            setIsValid(true);
            fileisValid = true;
        }else{
            setIsValid(false)
            fileisValid = false
        }
        props.onInput(props.id, pickedFile, fileisValid)
        return;
    };

    const pickImageHandler = () => {
        filePickerRef.current.click()
    };

    return (
      <div className="form-control">
          <input id={props.id} ref={filePickerRef} style={{display:'none'}} type="file" accept=".jpg,.png,.jpeg" onChange={pickedHandler} />
          <div className={`image-upload ${props.center && 'center'}`}>
            <div className="image-upload__preview">
                {perviewUrl && <img src={perviewUrl} alt="Preview" /> }
                {!perviewUrl && <p>Please pick an image.</p> }
            </div>
            <Button type="button" onClick={pickImageHandler}>Pick Image</Button>
          </div>
          {!isValid && <p>{props.errorText}</p>}
      </div>
    )
};

export default ImageUpload