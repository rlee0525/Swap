import React from 'react';
import Dropzone from 'react-dropzone';
import request from 'superagent';

const CLOUDINARY_UPLOAD_PRESET = 'xmfenamw';
const CLOUDINARY_UPLOAD_URL = 'https://api.cloudinary.com/v1_1/dkympkwdz/upload';

class PostForm extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.updateState = this.updateState.bind(this);
    this.onImageDrop = this.onImageDrop.bind(this);
    this.submitForm = this.submitForm.bind(this);
    this.categoryRadioUpdate = this.categoryRadioUpdate.bind(this);
    this.conditionRadioUpdate = this.conditionRadioUpdate.bind(this);
    this.fetchAllCategories = this.fetchAllCategories.bind(this);
    this.state = {
      title: "",
      description: "Description",
      category: "textbooks",
      condition: "brand new",
      price: 0,
      img_url1: "",
      img_url2: "",
      img_url3: "",
      courseSearch: ""
    }
  }

  public onImageDrop(files) {
    this.setState({
      uploadedFile: files[0]
    });

    this.handleImageUpload(files[0]);
  }

  public handleImageUpload(file) {
    let upload = request.post(CLOUDINARY_UPLOAD_URL)
                     .field('upload_preset', CLOUDINARY_UPLOAD_PRESET)
                     .field('file', file);

    upload.end((err, response) => {
      if (err) {
        console.error(err);
      }

      if (response.body.secure_url !== '') {
        if (this.state.img_url1 !== "" && this.state.img_url2 !== "") {
          this.setState({
            img_url3: response.body.secure_url
          });
        } else if (this.state.img_url1 !== "") {
          this.setState({
            img_url2: response.body.secure_url
          });
        } else {
          this.setState({
            img_url1: response.body.secure_url
          });
        }
      }
    });
  }

  public componentDidMount() {
    $('.dropzone-upload').on('dragenter', function() {
      $(this)
        .css({'background-color' : 'rgba(0,0,0,0.2)'})
    });
    $('.dropzone-upload').on('dragleave', function() {
      $(this)
        .css({'background-color' : 'rgba(0,0,0,0)'})
    });

    this.fetchAllCategories();
  }

  public fetchAllCategories() {
    $.ajax({
      method: "GET",
      url: "http://localhost:3000/api/courses"
    }).then(courses => {
      let coursesArray = courses.map(course => course.course_number)
      this.setState({ courses: coursesArray })
    })
  }

  public updateState(e) {
    this.setState({ [e.target.id]: e.target.value })
  }

  public categoryRadioUpdate(e) {
    this.setState({ category: e.currentTarget.textContent.toLowerCase() })
  }

  public conditionRadioUpdate(e) {
    this.setState({ condition: e.currentTarget.textContent.toLowerCase() })
  }

  public submitForm(e) {
    e.preventDefault();
    console.log(this.state);
  }

  public render() {
    return (
      <div>
        <div className="container">
        <h1>Post a New Item</h1>
          <form className="form-horizontal">
            <div className="form-group radio-group">
              <label htmlFor="inputCategory3" className="col-sm-3 control-label">Category</label>
                <div onClick={this.categoryRadioUpdate} className={`col-sm-1 radio-button ${this.state.category === "textbooks" ? "radio-active" : "" }`}>Textbooks</div>
                <div onClick={this.categoryRadioUpdate} className={`col-sm-1 radio-button ${this.state.category === "clothing" ? "radio-active" : "" }`}>Clothing</div>
                <div onClick={this.categoryRadioUpdate} className={`col-sm-1 radio-button ${this.state.category === "furniture" ? "radio-active" : "" }`}>Furniture</div>
                <div onClick={this.categoryRadioUpdate} className={`col-sm-1 radio-button ${this.state.category === "electronics" ? "radio-active" : "" }`}>Electronics</div>
                <div onClick={this.categoryRadioUpdate} className={`col-sm-1 radio-button ${this.state.category === "kitchenware" ? "radio-active" : "" }`}>Kitchenware</div>
                <div onClick={this.categoryRadioUpdate} className={`col-sm-1 radio-button ${this.state.category === "games" ? "radio-active" : "" }`}>Games</div>
            </div>
            <div className="form-group radio-group">
              <label htmlFor="inputCondition3" className="col-sm-3 control-label">Condition</label>
                <div onClick={this.conditionRadioUpdate} className={`col-sm-3 radio-button ${this.state.condition === "brand new" ? "radio-active" : "" }`}>Brand New</div>
                <div onClick={this.conditionRadioUpdate} className={`col-sm-3 radio-button ${this.state.condition === "like new" ? "radio-active" : "" }`}>Like New</div>
                <div onClick={this.conditionRadioUpdate} className={`col-sm-3 radio-button ${this.state.condition === "used" ? "radio-active" : "" }`}>Used</div>
            </div>
            <div className="form-group">
              <label htmlFor="inputCourse3" className="col-sm-3 control-label">Course</label>
              <div className="col-sm-9 input-group" >
                <input maxLength={50} value={this.state.courseSearch} onChange={ this.updateState } type="text" className="form-control" id="courseSearch" placeholder="Type to autocomplete"/>
                <span className="input-group-addon" id="basic-addon1"></span>
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="inputTitle3" className="col-sm-3 control-label">Title</label>
              <div className="col-sm-9 input-group" >
                <input maxLength={50} value={this.state.title} onChange={ this.updateState } type="text" className="form-control" id="title" placeholder="Title"/>
                <span className="input-group-addon" id="basic-addon1">&nbsp;{50 - this.state.title.length} characters left</span>
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="inputDescription3" className="col-sm-3 control-label">Description</label>
              <div className="col-sm-9 input-group">
                <textarea maxLength={250} value={this.state.description} onChange={ this.updateState } className="form-control" id="description" rows="3"></textarea>
                <span className="input-group-addon" id="basic-addon1">{250 - this.state.description.length} characters left</span>
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="inputPrice3" className="col-sm-3 control-label">Price</label>
              <div className="col-sm-9 input-group" >
                <input value={this.state.price} onChange={ this.updateState } type="text" className="form-control" id="price" placeholder="Price"/>
                <span className="input-group-addon" id="basic-addon1">&nbsp;Integer Only ${this.state.price}</span>
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="inputImage3" className="col-sm-3 control-label">Image(s)</label>
              <div className="col-sm-3 FileUpload">
                <Dropzone
                  id="img_url1"
                  className="dropzone-upload form-control"
                  multiple={ false }
                  accept="image/*"
                  onDrop={this.onImageDrop}>
                  {this.state.img_url1 === '' ? <div>Click or drop image here</div> :
                    <img className="img-responsive" src={this.state.img_url1} />}
                </Dropzone>
              </div>
              <div className="col-sm-3 FileUpload">
                <Dropzone
                  id="img_url1"
                  className="dropzone-upload form-control"
                  multiple={ false }
                  accept="image/*"
                  onDrop={this.onImageDrop}>
                  {this.state.img_url2 === '' ? <div>Click or drop image here</div> :
                    <img className="img-responsive" src={this.state.img_url2} />}
                </Dropzone>
              </div>
              <div className="col-sm-3 FileUpload">
                <Dropzone
                  id="img_url1"
                  className="dropzone-upload form-control"
                  multiple={ false }
                  accept="image/*"
                  onDrop={this.onImageDrop}>
                  {this.state.img_url3 === '' ? <div>Click or drop image here</div> :
                    <img className="img-responsive" src={this.state.img_url3} />}
                </Dropzone>
              </div>
            </div>
            <div className="form-group">
              <div className="col-sm-12">
                <button onClick={ this.submitForm } type="button" className="btn btn-success btn-lg btn-block">Create</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export { PostForm };
