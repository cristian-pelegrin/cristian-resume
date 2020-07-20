function download_file(fileURL, fileName) {
  if (!window.ActiveXObject) { // for non-IE
    const save = document.createElement('a');
    save.href = fileURL;
    save.target = '_blank';
    const filename = fileURL.substring(fileURL.lastIndexOf('/')+1);
    save.download = fileName || filename;
    if ( navigator.userAgent.toLowerCase().match(/(ipad|iphone|safari)/) && navigator.userAgent.search("Chrome") < 0) {
      document.location = save.href;
    } else {
      const evt = new MouseEvent('click', {
        'view': window,
        'bubbles': true,
        'cancelable': false
      });
      save.dispatchEvent(evt);
      (window.URL || window.webkitURL).revokeObjectURL(save.href);
    }
  } else if ( !! window.ActiveXObject && document.execCommand) {  // for IE < 11
    const _window = window.open(fileURL, '_blank');
    _window.document.close();
    _window.document.execCommand('SaveAs', true, fileName || fileURL)
    _window.close();
  }
}
