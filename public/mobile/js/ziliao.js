$(document).ready(function() {
	var File = document.getElementById("file1")
	var Preview = document.getElementById("headpic");
	File.onchange = function() {
		$("#headpic img").remove();
		var fr = new FileReader();
		fr.readAsDataURL(this.files[0]);
		fr.onload = function() {
			var img = document.createElement("img");
			img.src = fr.result;
			Preview.appendChild(img)
		}
	}
//	File.click(function () {
//		console.log(4444)
//		$("#headpic").removeChild($("#headpic img"));
//	})

})