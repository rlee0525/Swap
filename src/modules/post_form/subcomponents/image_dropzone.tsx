import React from 'react';
import Dropzone from 'react-dropzone';

const ImageDropzone = ({ img_url, onImageDrop }) => (
  <div className="col-sm-3 FileUpload">
    <Dropzone
      id="img_url1"
      className="dropzone-upload form-control"
      multiple={ false }
      accept="image/*"
      onDrop={onImageDrop}>
      {img_url === '' ? <div>Click or drop image here<br />(330 x 330)</div> :
        <img className="img-responsive center-block" style={{ height: '100%', width: 'auto' }} src={img_url} />}
    </Dropzone>
  </div>
);

export { ImageDropzone };