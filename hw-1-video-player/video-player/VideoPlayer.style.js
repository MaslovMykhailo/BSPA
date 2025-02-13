export const ClassName = {
  uploadControls: 'upload-controls',
  uploadControl: 'upload-control',
}

export function createVideoPlayerStyleSheet() {
  return createStyleSheet([
    createContainerStyles(),
    createHeaderStyles(),
    createVideoStyles(),
    createUploadControlsStyles(),
    createUploadControlStyles(),
  ])
}

function createStyleSheet(styles) {
  const styleSheet = new CSSStyleSheet()
  return styleSheet.replace(styles.join(' '))
}

function createContainerStyles() {
  return `
    section {
      display: flex;
      flex-direction: column;
      max-width: 70vw;
      margin: 0 auto;
    }
  `
}

function createVideoStyles() {
  return `
    video {
      width: 100%;
      max-height: 50vh;
    }
  `
}

function createHeaderStyles() {
  return `
    header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 0.5rem;
    }
  `
}

function createUploadControlsStyles() {
  return `
    .${ClassName.uploadControls} {
      margin-top: 1rem;
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }
  `
}

function createUploadControlStyles() {
  return `
    .${ClassName.uploadControl} {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: 0.5rem;
      padding: 0.5rem;
      border-bottom: 1px solid black;
    }
  `
}
