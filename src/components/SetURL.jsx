export const SetURL = (params) => {
  let {
    inKeywords,
    inTitle,
    inAuthor,
    inPublisher,
    inSubject,
    inISBN,
    inFilter,
    inDownload,
    inLangRestrict,
    inStartIndex,
    inOrderBy,
    inPrintType,
  } = params;

  let keywords = inKeywords ? inKeywords : "";
  let title = inTitle ? `+intitle:${inTitle}` : "";
  let author = inAuthor ? `+inauthor:${inAuthor}` : "";
  let publisher = inPublisher ? `+inpublisher:${inPublisher}` : "";
  let subject = inSubject ? `+subject:${inSubject}` : "";
  let isbn = inISBN ? `+isbn:${inISBN}` : "";
  let filter = inFilter ? `&filter=${inFilter}` : "";
  let printType = inPrintType ? `&printType=${inPrintType}` : "";
  let startIndex = inStartIndex ? inStartIndex : "0";
  let orderBy = inOrderBy ? `&orderBy=${inOrderBy}` : "";
  let langRestrict = inLangRestrict ? `&langRestrict=${inLangRestrict}` : "";
  let maxResults = "&maxResults=40";
  let download = inDownload ? `&download=${inDownload}` : "";

  const API_KEY = "ENTER YOUR KEY HERE";
  const API_URL = "https://www.googleapis.com/books/v1/volumes";

  let query = `?q=${keywords}${title}${author}${publisher}${subject}${isbn}${maxResults}${orderBy}${printType}${langRestrict}${filter}${download}&startIndex=${startIndex}`;
  let URL = `${API_URL}?q=${keywords}${title}${author}${publisher}${subject}${isbn}${maxResults}${orderBy}${printType}${langRestrict}${filter}${download}&startIndex=${startIndex}&key=${API_KEY}`;

  // console.log(URL);

  return { URL, query };
};
