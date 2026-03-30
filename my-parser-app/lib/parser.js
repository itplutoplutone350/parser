
export default function parseFixedFormat(text, fieldsMap){
 const result={};
 for(const [key,label] of Object.entries(fieldsMap)){
   const regex=new RegExp(`^${label}:\s*(.*)$`,"mi");
   const match=text.match(regex);
   result[key]=match?match[1].trim():null;
 }
 return result;
}
