class Modal {
  constructor(options) {
    this.options = Object.assign(
      {
        title: "标题",
        showClose: true,
        content: "",
        showCancel: true,
        showConfirm: true,
        cancelText: "取消",
        confirmText: "确定",
        width: "480px",
        onCancel: () => {
          this.closeModal();
        },
        onConfirm: () => {
          this.confirmModal;
        },
      },
      options
    );
  }
  init() {
    let maskDom = document.createElement("div");
    maskDom.className = "el-overlay";
    let dialogDom = document.createElement("div");
    dialogDom.className = "el-dialog";
    dialogDom.style = "width:" + this.options.width;
    let headerDom = document.createElement("div");
    headerDom.className = "el-dialog__header";
    this.createHeader(headerDom);
    let bodyDom = document.createElement("div");
    bodyDom.className = "el-dialog__body";
    this.createBody(bodyDom);
    let footerDom = document.createElement("div");
    footerDom.className = "el-dialog__footer";
    this.createFooter(footerDom);
    dialogDom.appendChild(headerDom);
    dialogDom.appendChild(bodyDom);
    dialogDom.appendChild(footerDom);
    maskDom.appendChild(dialogDom);
    document.body.appendChild(maskDom);
  }
  createHeader(headerDom) {
    let titleDom = document.createElement("span");
    titleDom.className = "el-dialog__title";
    titleDom.innerText = this.options.title;
    headerDom.appendChild(titleDom);
    if (this.options.showClose) {
      let closeDom = document.createElement("button");
      closeDom.className = "el-dialog__headerbtn";
      closeDom.type = 'button';
      closeDom.onclick = this.options.onCancel;
      closeDom.innerHTML = '<i class="el-dialog__close el-icon el-icon-close"></i>';
      headerDom.appendChild(closeDom);
    }
  }
  createBody(bodyDom) {
    bodyDom.innerHTML = this.options.content;
  }
  createFooter(footerDom) {
    if (this.options.showCancel) {
      let cancelDom = document.createElement("button");
      cancelDom.className = "el-button el-button--default el-button--mini";
      cancelDom.type = "button";
      cancelDom.innerText = this.options.cancelText;
      cancelDom.onclick = this.options.onCancel;
      footerDom.appendChild(cancelDom);
    }
    if (this.options.showConfirm) {
      let confirmDom = document.createElement("button");
      confirmDom.className = "el-button el-button--primary el-button--mini";
      confirmDom.type = "button";
      confirmDom.innerText = this.options.confirmText;
      confirmDom.onclick = this.options.onConfirm;
      footerDom.appendChild(confirmDom);
    }
  }
  closeModal() {
    console.log('closeModal');
    document.body.removeChild(document.getElementsByClassName("el-overlay")[0]);
  }
  confirmModal() {
    console.log("confirm");
    document.body.removeChild(document.getElementsByClassName("el-overlay")[0]);
  }
}
