import React from "react";
import Dropzone from "react-dropzone";
import { Link } from "react-router-dom";

const ImagePicker = (props) => {
  const {
    label,
    text = "Drop files here or click to upload.",
    onDrop,
    selectedFiles,
    className,
    name,
    previewClassName = "dropzone-previews",
    previewId = "file-previews",
    previewCardStyle,
    showPreview = true,
    setselectedFiles,
    PreviewDeletable = true,
    isDefaultDesign = true,
    children,
    classNameMain,
    classNameDiv,
    accept,
  } = props;
  const onDeletePreview = (index) => {
    let array = Object.assign([], selectedFiles);
    array.splice(index, 1);
    setselectedFiles(array);
  };
 
  return (
    <div className={`image-picker ${classNameMain}`}>
      <h4 className="form-label">{label ? label : name}</h4>
      <Dropzone
        onDrop={(files) => onDrop(files)}
        className={className}
        name={name}
        accept={accept}
      >
        {({ getRootProps, getInputProps }) => (
          <div className={isDefaultDesign ? "dropzone" : classNameDiv}>
            <div
              className={
                isDefaultDesign ? "dz-message needsclick" : classNameDiv
              }
              {...getRootProps()}
            >
              <input {...getInputProps()} />
              {isDefaultDesign || !children ? (
                <div>
                  <i className="display-4 text-muted uil uil-cloud-upload" />
                  <h6>{text}</h6>
                </div>
              ) : (
                children
              )}
            </div>
          </div>
        )}
      </Dropzone>
      {showPreview && (
        <div className={previewClassName} id={previewId}>
          {selectedFiles &&
            selectedFiles.map((f, i) => {
          
              return (
                <div
                  style={previewCardStyle}
                  className="mt-1 mb-0 shadow-none border dz-processing dz-image-preview dz-success dz-complete"
                  key={i + "-file"}
                >
                  <div className="p-2">
                    <div className="align-items-center">
                      <div className="col-auto">
                        <img
                          data-dz-thumbnail=""
                          height={80}
                          width={80}
                          className="avatar-sm rounded bg-light"
                          alt={f.name}
                          src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
                        />
                      </div>
                      <div>
                        {/* <Link to="#" className="text-muted font-weight-bold">
                          {f.name}
                        </Link> */}
                        <p className="mb-0">
                          <strong>{f.formattedSize}</strong>
                        </p>
                      </div>
                      {PreviewDeletable && (
                        <div lg={1} md={1} sm={1} className="position-relative">
                          <i
                            style={{ right: 5 }}
                            onClick={() => onDeletePreview(i)}
                            className="uil-trash-alt position-absolute bottom-0 font-size-20"
                          ></i>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      )}
    </div>
  );
};

export default ImagePicker;
