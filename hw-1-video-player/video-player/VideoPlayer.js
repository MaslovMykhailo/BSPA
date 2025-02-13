import { createVideoPlayerStyleSheet, ClassName } from './VideoPlayer.style.js'

const Id = {
  video: 'video',
  videoInput: 'video-input',
  filePickerButton: 'file-picker-button',
  resetButton: 'reset-button',
}

const Content = {
  title: 'Video Player',
  videoInputLabel: 'Upload video (<input type="file" />)',
  filePickerButtonLabel: 'Upload video (showOpenFilePicker)',
  filePickerButtonText: 'Choose video',
  filePickerDescription: 'Video',
  resetButtonText: 'Reset',
}

export class VideoPlayer extends HTMLElement {
  static get observedAttributes() {
    return ['title']
  }

  getById(id) {
    return this.shadowRoot.getElementById(id)
  }

  constructor() {
    super()

    const container = this.createContainer()
    container.appendChild(this.createHeader())
    container.appendChild(this.createVideo())
    container.appendChild(this.createUploadControls())

    this.attachShadow({ mode: 'open' })
    this.shadowRoot.appendChild(container)

    createVideoPlayerStyleSheet()
      .then((styleSheets) => {
        this.shadowRoot.adoptedStyleSheets = [styleSheets]
      })
      .catch(console.error)

    this.loadVideoFile = this.loadVideoFile.bind(this)
    this.handleVideoError = this.handleVideoError.bind(this)
    this.handleVideoCanPlay = this.handleVideoCanPlay.bind(this)
    this.handleVideoInputChange = this.handleVideoInputChange.bind(this)
    this.handleFilePickerButtonClick = this.handleFilePickerButtonClick.bind(this)
    this.handleResetButtonClick = this.handleResetButtonClick.bind(this)
  }

  createContainer() {
    const container = document.createElement('section')
    return container
  }

  createHeader() {
    const header = document.createElement('header')
    header.appendChild(this.createTitle())
    header.appendChild(this.createResetButton())
    return header
  }

  createTitle() {
    const title = document.createElement('h1')
    title.textContent = this.title
    return title
  }

  createResetButton() {
    const resetButton = document.createElement('button')
    resetButton.id = Id.resetButton
    resetButton.textContent = 'Reset'
    resetButton.hidden = true
    return resetButton
  }

  createVideo() {
    const video = document.createElement('video')
    video.id = Id.video
    video.controls = true
    return video
  }

  createUploadControls() {
    const uploadControls = document.createElement('div')
    uploadControls.classList.add(ClassName.uploadControls)

    const videoInputContainer = this.createUploadControlContainer(Content.videoInputLabel)
    videoInputContainer.appendChild(this.createVideoInput())
    uploadControls.appendChild(videoInputContainer)

    const filePickerButtonContainer = this.createUploadControlContainer(Content.filePickerButtonLabel)
    filePickerButtonContainer.appendChild(this.createFilePickerButton())
    uploadControls.appendChild(filePickerButtonContainer)

    return uploadControls
  }

  createUploadControlContainer(caption) {
    const container = document.createElement('div')
    container.classList.add(ClassName.uploadControl)

    const controlCaption = document.createElement('label')
    controlCaption.textContent = caption

    container.appendChild(controlCaption)
    return container
  }

  createVideoInput() {
    const videoInput = document.createElement('input')
    videoInput.id = Id.videoInput
    videoInput.type = 'file'
    videoInput.accept = 'video/*'
    return videoInput
  }

  createFilePickerButton() {
    const filePickerButton = document.createElement('button')
    filePickerButton.id = Id.filePickerButton
    filePickerButton.textContent = Content.filePickerButtonText
    return filePickerButton
  }

  get title() {
    return this.getAttribute('title') || Content.title
  }

  connectedCallback() {
    this.getById(Id.video).addEventListener('error', this.handleVideoError)
    this.getById(Id.video).addEventListener('canplay', this.handleVideoCanPlay)

    this.getById(Id.videoInput).addEventListener('change', this.handleVideoInputChange)
    this.getById(Id.filePickerButton).addEventListener('click', this.handleFilePickerButtonClick)

    this.getById(Id.resetButton).addEventListener('click', this.handleResetButtonClick)
  }

  disconnectedCallback() {
    this.getById(Id.video).removeEventListener('error', this.handleVideoError)
    this.getById(Id.video).removeEventListener('canplay', this.handleVideoCanPlay)

    this.getById(Id.videoInput).removeEventListener('change', this.handleVideoInputChange)
    this.getById(Id.filePickerButton).removeEventListener('click', this.handleFilePickerButtonClick)

    this.getById(Id.resetButton).removeEventListener('click', this.handleResetButtonClick)

    const video = this.getById(Id.video)
    video.src && URL.revokeObjectURL(video.src)
  }

  handleVideoInputChange(event) {
    const [file] = event.target.files
    this.loadVideoFile(file)
    this.showResetButton()
  }

  static filePickerOptions = {
    types: [
      {
        description: Content.filePickerDescription,
        accept: {
          'video/*': ['.avi', '.flv', '.mkv', '.mov', '.mp4', '.mpeg', '.webm', '.wmv'],
        },
      },
    ],
    excludeAcceptAllOption: true,
    startId: 'videos',
    multiple: false,
  }

  async handleFilePickerButtonClick() {
    try {
      const [fileHandle] = await window.showOpenFilePicker(VideoPlayer.filePickerOptions)
      this.loadVideoFile(await fileHandle.getFile())
      this.showResetButton()
    } catch (error) {
      console.error(error)
    }
  }

  loadVideoFile(file) {
    const url = URL.createObjectURL(file)
    const video = this.getById(Id.video)
    video.src = url
    video.load()
  }

  handleVideoCanPlay(event) {
    const video = event.target
    video.play()
  }

  handleVideoError(event) {
    const video = event.target
    URL.revokeObjectURL(video.src)
  }

  handleResetButtonClick() {
    const video = this.getById(Id.video)

    URL.revokeObjectURL(video.src)
    video.src = ''

    this.hideResetButton()
  }

  hideResetButton() {
    this.getById(Id.resetButton).hidden = true
  }

  showResetButton() {
    this.getById(Id.resetButton).hidden = false
  }
}
