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
    this.initializeDropzone = this.initializeDropzone.bind(this);
    this.renderErrors = this.renderErrors.bind(this);

    this.state = {
      title: "",
      description: "",
      category: "Textbooks",
      condition: "Brand New",
      course: "",
      price: "",
      img_url1: "",
      img_url2: "",
      img_url3: "",
      courses: null
    }

    if (typeof props.params.id !== "undefined") {
      this.fetchPost(props.params.id)
    }
  }

  public componentWillReceiveProps(nextProps) {
    if (typeof nextProps.params.id !== "undefined") {
      this.fetchPost(nextProps.params.id)
    } else {
      this.setState({
        title: "",
        description: "",
        category: "Textbooks",
        condition: "Brand New",
        course: "",
        price: "",
        img_url1: "",
        img_url2: "",
        img_url3: "",
        courses: null
      })
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

      const transformationPrefix = "http://res.cloudinary.com/dkympkwdz/image/upload/ar_3,c_crop,g_auto,h_1000,q_80,w_1000/f_jpg/";

      if (response.body.secure_url !== '') {
        if (this.state.img_url1 !== "" && this.state.img_url2 !== "") {
          this.setState({
            img_url3: transformationPrefix + response.body.secure_url.split("/").slice(-1)[0]
          });
        } else if (this.state.img_url1 !== "") {
          this.setState({
            img_url2: transformationPrefix + response.body.secure_url.split("/").slice(-1)[0]
          });
        } else {
          this.setState({
            img_url1: transformationPrefix + response.body.secure_url.split("/").slice(-1)[0]
          });
        }
      }
    });
  }

  public initializeDropzone() {
    $('.dropzone-upload').on('dragenter', function() {
      $(this)
        .css({'background-color' : 'rgba(0,0,0,0.2)'})
    });
    $('.dropzone-upload').on('dragleave', function() {
      $(this)
        .css({'background-color' : 'rgba(0,0,0,0)'})
    });
  }

  public componentDidMount() {
    this.initializeDropzone();
    this.fetchAllCategories();
  }

  public fetchPost(id) {
    $.ajax({
      method: "GET",
      url: `http://localhost:3000/api/posts/${id}`
    }).then(post => {
      this.setState({ ...post })
    })
  }

  public fetchAllCategories() {
    $.ajax({
      method: "GET",
      url: "http://localhost:3000/api/courses"
    }).then(courses => {
      let coursesArray = courses.map(course => course.course_number)
      this.setState({ courses: coursesArray })
    }).fail(errors => {
      this.setState({ errors })
    })
  }

  public updateState(e) {
    this.setState({ [e.target.id]: e.target.value })
  }

  public categoryRadioUpdate(e) {
    this.setState({ category: e.currentTarget.textContent })
  }

  public conditionRadioUpdate(e) {
    this.setState({ condition: e.currentTarget.textContent })
  }

  public submitForm(e) {
    const { title, condition, course, price, description, category, img_url1, img_url2, img_url3 } = this.state;
    e.preventDefault();
    const method, url;
    if (typeof this.props.postData === 'undefined') {
      method = "POST";
      url = "/api/posts";
    } else {
      method = "PATCH";
      url = `/api/posts/${this.props.postData.id}`
    }
    $.ajax({
      method: method,
      url: url,
      data: {
        post: { title, condition, price, description, img_url1, img_url2, img_url3 },
        course: { course },
        category: { category }
      }
    }).then(post => this.props.props.router.replace(`posts/${post.id}`))
      .fail(errors => {
        this.setState({ errors })
      })
  }

  public renderErrors() {
    if (typeof this.state.errors === "undefined") {
      return null
    } else {
      return this.state.errors.responseJSON.map((error, key) =>
      (
        <div key={key} className="alert alert-danger" role="alert">
          <span className="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>
          <span className="sr-only">Error:</span> {error}
        </div>
      ))
    }
  }

  public render() {
    return (
      <div>
        <div className="container">
        {this.renderErrors()}
        <h1>{typeof this.props.params.id === "undefined" ? "Post a New Item" : `Edit Post ${this.state.id}`}</h1>
          <form className="form-horizontal">
            <div className="form-group radio-group">
              <label htmlFor="inputCategory3" className="col-sm-3 control-label">Category</label>
                <div onClick={this.categoryRadioUpdate} className={`col-sm-1 radio-button ${this.state.category === "Textbooks" ? "radio-active" : "" }`}>Textbooks</div>
                <div onClick={this.categoryRadioUpdate} className={`col-sm-1 radio-button ${this.state.category === "Clothing" ? "radio-active" : "" }`}>Clothing</div>
                <div onClick={this.categoryRadioUpdate} className={`col-sm-1 radio-button ${this.state.category === "Furniture" ? "radio-active" : "" }`}>Furniture</div>
                <div onClick={this.categoryRadioUpdate} className={`col-sm-1 radio-button ${this.state.category === "Electronics" ? "radio-active" : "" }`}>Electronics</div>
                <div onClick={this.categoryRadioUpdate} className={`col-sm-1 radio-button ${this.state.category === "Kitchenware" ? "radio-active" : "" }`}>Kitchenware</div>
                <div onClick={this.categoryRadioUpdate} className={`col-sm-1 radio-button ${this.state.category === "Games" ? "radio-active" : "" }`}>Games</div>
            </div>
            <div className="form-group radio-group">
              <label htmlFor="inputCondition3" className="col-sm-3 control-label">Condition</label>
                <div onClick={this.conditionRadioUpdate} className={`col-sm-3 radio-button ${this.state.condition === "Brand New" ? "radio-active" : "" }`}>Brand New</div>
                <div onClick={this.conditionRadioUpdate} className={`col-sm-3 radio-button ${this.state.condition === "Like New" ? "radio-active" : "" }`}>Like New</div>
                <div onClick={this.conditionRadioUpdate} className={`col-sm-3 radio-button ${this.state.condition === "Used" ? "radio-active" : "" }`}>Used</div>
            </div>
            <div className="form-group">
              <label htmlFor="inputCourse3" className="col-sm-3 control-label">Course</label>
              <div className="col-sm-9 input-group" >
                <input maxLength={50} value={this.state.course} onChange={ this.updateState } type="text" className="form-control" id="course" placeholder="Type to autocomplete"/>
                <span className="input-group-addon" id="basic-addon1"></span>
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="inputTitle3" className="col-sm-3 control-label">Title</label>
              <div className="col-sm-9 input-group" >
                <input maxLength={50} value={this.state.title} onChange={this.updateState} type="text" className="form-control" id="title" placeholder="Title"/>
                <span className="input-group-addon" id="basic-addon1">&nbsp;{50 - this.state.title.length} characters left</span>
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="inputDescription3" className="col-sm-3 control-label">Description</label>
              <div className="col-sm-9 input-group">
                <textarea maxLength={250} value={this.state.description} onChange={this.updateState} className="form-control" id="description" rows="3"></textarea>
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
              <label htmlFor="inputImage3" className="col-sm-3 control-label">Image(s) <br/> (required 1) <br/> (will be cropped squarely)</label>
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
                <button onClick={this.submitForm} type="button" className="btn btn-success btn-lg btn-block">{typeof this.props.postData === "undefined" ? "Create" : "Update"}</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export { PostForm };
