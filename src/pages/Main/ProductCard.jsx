import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const Card = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  cursor: pointer;

  .img-box {
    width: 100%;
    aspect-ratio: 1 / 1;
    border-radius: 12px;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    
    img {
      width: 100%; 
      height: 100%;
      object-fit: contain; 
    }
  }

  .info-box {
    text-align: left;
    padding: 10px 0;
    
    .name { 
      display: block;
      font-size: 11px;
      font-family: Pretendard; 
      color: #333; 
      font-weight: 400; 
      margin-bottom: 4px; 
      line-height: 1.2;
    }

    .price { 
      color: #000; 
      font-family: Pretendard;
      font-size: 11px;
      font-weight: 700; 
      margin-bottom: 2px;
    }

    .review { 
      color: #A7A7A7;
      font-family: Pretendard;
      font-size: 11px;
      font-weight: 400; 
    }
  }
`;

export default function ProductCard({ itemId, image, name, price, reviewCount }) {
  const navigate = useNavigate();

  return (
    <Card onClick={() => navigate(`/item/${itemId}`)}>
      <div className="img-box">
        <img src={image} alt={name} />
      </div>
      <div className="info-box">
        <div className="name">{name}</div>
        <div className="price">{price}</div>
        <div className="review">리뷰 {reviewCount}</div>
      </div>
    </Card>
  );
}