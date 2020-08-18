import React, { Component } from 'react'
import { connect } from 'react-redux'
import EditorHeader from './helper/EditorHeader'
import { publishStory } from '../redux/actions/ArticleAction'

class Editor extends Component {
  constructor() {
    super()
    this.state = {
      text: '',
      title: '',
      description: '',
      imgSrc: '',
    }
  }

  onPublishStory = () => {
    const { propsUser, publishStory } = this.props
    const { text, title, description, imgSrc } = this.state
    publishStory({
      text: text,
      title: title,
      claps: 0,
      description: description,
      feature_img: imgSrc,
      user_id: propsUser._id,
    })
  }
  handleChange = event => {
    const { name, value, type, checked } = event.target
    const value2 = (type === 'checkbox') ? checked : value
    this.setState({ [name]: value2 })
  }
  // handleClickUpload=() => {
  //   this.refs.fileUploader.click()
  // }
  // previewImg=() => {
  //   const file = this.refs.fileUploader.files[0]
  //   var reader = new FileReader()
  //   reader.onload = function (e) {
  //     document.getElementById('image_preview').src = e.target.result
  //     this.setState({
  //       imgSrc: file
  //     })
  //   }.bind(this)
  //   reader.readAsDataURL(file)
  // }
  render() {
    const { text, title, description, imgSrc } = this.state
    const { propsLoading, propsUser } = this.props
    return (
      <div>
        <EditorHeader publish={this.onPublishStory} loading={propsLoading} />
        <div className="container-fluid main-container">
          <div className="row animated fadeInUp" data-animation="fadeInUp-fadeOutDown">
            <div id="main-post" className="col-xs-10 col-md-8 col-md-offset-2 col-xs-offset-1 main-content">
              <div className="post-metadata">
                <img alt={propsUser.name} className="avatar-image" src={propsUser.provider_pic} height="40" width="40" />
                <div className="post-info">
                  <div data-react-classname="PopoverLink">
                    <span className="popover-link" data-reactroot="">
                      {propsUser.name}
                    </span>
                  </div>
                  <small>
                    {propsUser.email}
                  </small>
                </div>
              </div>

              <form className="editor-form main-editor" autoComplete="off" >
                {/* <div className={imgSrc != null ? 'file-upload-previewer' : 'file-upload-previewer hidden'}>
                  <img src="" alt="" id="image_preview" />
                </div>
                <div className="existing-img-previewer" id="existing-img-previewer">
                </div> */}

                <div className="form-group">
                  <label>Category: </label>
                  {' '}
                  <input type="text" value={text} name='text' onChange={this.handleChange} placeholder="Category" />
                </div>
                <div className="form-group">
                  <label>Title:</label>
                  &nbsp;&nbsp;&nbsp;&nbsp;
                  &nbsp;&nbsp;&nbsp;&nbsp;
                  <input type="text" value={title} name='title' onChange={this.handleChange} placeholder="Title" />
                </div>
                <div className="form-group">
                  <label>Description: </label>
                  <div />
                  {' '}
                  <textarea value={description} name='description' onChange={this.handleChange} placeholder="Description" />
                </div>

                <div className="form-group">
                  {/* <span className="picture_upload"> */}
                  {/* <i className="fa fa-camera" onClick={this.handleClickUpload}></i> */}
                  {/* </span> */}
                  <i className="fa fa-camera" />
                  {' '}
                  <select name="imgSrc"
                    value={imgSrc} onChange={this.handleChange}>
                    <option value='https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcT3xzYvQWyS8JS6g3PXJwsf8dcEi6bgjjJocg&usqp=CAU'>Pic1</option>
                    <option value='https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcROrpa-OR0dG5As3B2u_9_loE-FulOlDDQKtF1g_tclfJILjW5I'>Pic2</option>
                    <option value='https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRd-y-IJN8glQlf1qoU01dEgGPUa0d1-sjfWg&usqp=CAU'>Pic3</option>
                  </select>
                </div>

                {/* <div className="hidden">
                  <input type="file" onChange={() => this.previewImg()} id="file" ref="fileUploader" />
                </div> */}
              </form>

            </div>
          </div>
        </div>
      </div>
    )
  }
}
const mapStateToProps = state => {
  return {
    propsUser: state.reducerUser.user,
    propsLoading: state.reducerArticle.loading,
  }
}
export default connect(mapStateToProps, { publishStory })(Editor)