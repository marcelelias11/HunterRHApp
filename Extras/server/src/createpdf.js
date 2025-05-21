function CreatePDFfromHTML() {
  document.getElementById("createpdf").classList.remove("show");
  document.getElementById("andamento").classList.remove("hide");
  document.getElementById("createpdf").classList.toggle("hide");
  document.getElementById("andamento").classList.toggle("show");
  sessionStorage.setItem("FECcounter", 0);
  sessionStorage.setItem("FPVcounter", 0);
  sessionStorage.setItem("contagem", 0);
  const HTML_Width = $("#toprint").width();
  const HTML_Height = $("#toprint").height();
  const top_left_margin = 0;
  const PDF_Width = (HTML_Width * 2) / 1.790620558976;
  const PDF_Height = HTML_Height;
  const canvas_image_width = PDF_Width;
  const canvas_image_height = PDF_Height;

  const pdf = new jsPDF("p", "pt", [PDF_Width, PDF_Height]);

  let imgDataArr = [];

  html2canvas($("#toprint")[0])
    .then(function (canvas) {
      let imgData = canvas.toDataURL("image/png", 1.0);
      imgDataArr.push(imgData);
      console.log(imgDataArr[0]);
      pdf.addImage(
        imgData,
        "PNG",
        top_left_margin,
        top_left_margin,
        canvas_image_width,
        canvas_image_height,
        "image",
        "FAST"
      );
      /*for (let i = 1; i <= totalPDFPages; i++) {
        pdf.addPage(PDF_Width, PDF_Height);
        pdf.addImage(
          imgData,
          "PNG",
          top_left_margin,
          -(PDF_Height * i) + top_left_margin * 4,
          canvas_image_width,
          canvas_image_height
        );
      }*/

      //document.write("Download em progresso!");
    })
    .then(function pdfSave() {
      return pdf.save("contrato.pdf");
    });
}
document.getElementById("createpdf").classList.toggle("hide");
document.getElementById("andamento").classList.toggle("hide");
function printtimeout() {
  document
    .getElementById("createpdf")
    .addEventListener("click", CreatePDFfromHTML);
  document.getElementById("aguarde").classList.toggle("hide");
  document.getElementById("createpdf").classList.remove("hide");
  document.getElementById("createpdf").classList.toggle("show");
}
setTimeout(printtimeout, 10000);
