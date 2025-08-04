
// import React from "react";
// import { useSelector } from "react-redux";
// import { Card, Container } from "react-bootstrap";

// const SingleProduct = () => {
//   const item = useSelector((state) => state.product.selectedItem);

//   if (!item?.title) return <Container className="py-5">No product selected</Container>;

//   return (
//     <Container className="py-5">
//       <Card className="mx-auto" style={{ width: "22rem" }}>
//         <Card.Img variant="top" src={item.thumbnail} />
//         <Card.Body>
//           <Card.Title>{item.title}</Card.Title>
//           <Card.Text>{item.description}</Card.Text>
//           <strong>Price: ₹{item.price}</strong>
//         </Card.Body>
//       </Card>
//     </Container>
//   );
// };

// export default SingleProduct;
