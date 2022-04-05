import React from "react";

export default function Price(props) {
  const p = String(props.price);
  const p1 = p.slice(0, 5);
  var price="0"
  if (p1 === "About") {
    price = p.replace("About ", "");
    const pp = price.slice(-3)
    price=parseInt(price)
    if(pp==="USD")
      price=price*75.53
    else if(pp==="EUR")
      price=price*83.09
  }
  else if(p.includes('$')){
    const pp = p.slice(p.indexOf("$") + 2, p.indexOf("/"));
    const pp2 = pp.replace(",", "");
    price = parseInt(pp2*75.53);
  }
  else if(p.includes('€')){
    const pp = p.slice(p.indexOf("$") + 2, p.indexOf("/"));
    const pp2 = pp.replace(",", "");
    price = parseInt(pp2*83.09);
  }
  else {
    price="None"
  }
  return (
    <div>
      <p>Price: <span style={{fontSize:"2em",}}>{price}</span> Inc. all taxes</p>
    </div>
  );
}
