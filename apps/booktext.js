
//row[0]
function splitText(data) {
      console.log(data)
      let str = data.book_content
      let bookText = str.split("p");
      return bookText;
      //["書的內容第一段","書的內容第二段"]
}

module.exports = splitText;