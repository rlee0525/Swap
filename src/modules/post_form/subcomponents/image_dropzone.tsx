import React from 'react';
import Dropzone from 'react-dropzone';

import { widthFull } from '../styles';

const ImageDropzone = ({ img_url, onImageDrop }) => (
  <div className="col-sm-3 FileUpload img-error">
    <Dropzone
      id="img_url1"
      className="dropzone-upload form-control"
      multiple={ false }
      style={{ cursor: "pointer" }}
      accept="image/*"
      onDrop={onImageDrop}>
      {img_url === '' ? <div>Click or drop image here<br />(330 x 330)</div> :
        <img className="img-responsive center-block" style={widthFull} src={img_url} />}
    </Dropzone>
  </div>
);

export { ImageDropzone };