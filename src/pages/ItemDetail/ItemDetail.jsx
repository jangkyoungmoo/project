  import styled from "styled-components";
  import { useParams, useNavigate } from "react-router-dom";
  import { useEffect, useState } from "react";
  import {getItemById, deleteItem} from "../../api/shop.js";


  const TopMenuWrapper = styled.div`
    position: absolute;
    top:-135px;
    right:0;
    display: flex;
    justify-content: flex-end;
    gap: 15px;
    z- index: 100;

    span {
      font-size: 12px;
      color: #888;
      cursor: pointer;
      &:hover { color: #222; }
    }
  `;

  const ModalOverlay = styled.div`
    position: fixed;
    top: 0; left: 0;
    width: 100%; height: 100%;
    background: rgba(180, 180, 180, 0.6); 
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
  `;

  const ModalBox = styled.div`
    background: white;
    padding: 50px 40px;
    border-radius: 25px;
    text-align: center;
    
    p { font-weight: bold; font-size: 18px; margin-bottom: 30px; }

    .button-group {
      display: flex;
      gap: 15px;
      button {
        padding: 12px 35px;
        border: none;
        border-radius: 10px;
        cursor: pointer;
        font-weight: bold;
      }
      .confirm { background: #f0f0f0; color: #333; }
      .cancel { background: #ccc; color: white; }
    }
  `;

  const DetailContainer = styled.div`
    display: flex;
    padding: 60px 160px;
    gap: 80px;
    max-width: 1280px;
    margin: 0 auto;
    position: relative;
  `;
  const ImageSection = styled.div`
    flex: 1;
    display: flex;
    justify-content: center;
    .image-wrapper {
      width: 100%;
      aspect-ratio: 1 / 1;
      display: flex;
      justify-content: center;
      align-items: center;
      img { width: 80%; }
    }
  `;
  const InfoSection = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding-left: 80px;
    border-left: 1.5px solid #EBEBEB; 
    position: relative; 
  `;
  const Price = styled.h2`
    font-size: 32px;
    font-weight: 700;
    margin-bottom: 10px;
  `;
  const Title = styled.p`
    font-size: 18px;
    color: #555;
    margin-bottom: 15px;
  `;
  const ReviewBox = styled.div`
    display: flex;
    gap: 8px;
    font-size: 14px;
    .star {
      font-weight: 700;
    }
    .count {
      color: #aaa;
    }
  `;

  export default function ItemDetail() {
      const { id } = useParams();
      const navigate = useNavigate();
      const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
      const [product, setProduct] = useState(null);
      const [loading, setLoading] = useState(true);

      useEffect(() => {
          const fetchProduct = async () => {
              try {
                setLoading(true);
                const data = await getItemById("clothes", id);
                setProduct(data);
              } catch (error) {
                console.error("상품을 불러오는데 실패했습니다", error);
              } finally {
                setLoading(false);
              }
            };
            if (id) fetchProduct();
      }, [id]);

      if (loading) return <div style={{ textAlign: "center", padding: "20px" }}>로딩 중...</div>;
      if(!product) return <div style={{ textAlign: "center", padding: "20px" }}>상품을 찾을 수 없습니다.</div>;

      const handleDelete = async () =>{
        try{
          await deleteItem("clothes", id);
          alert("상품이 성공적으로 삭제되었습니다.")
          navigate('/');
        }catch(error){
          console.error("삭제 실패:", error);
          alert("상품 삭제에 실패했습니다.");
        }
      };

      return (
          <DetailContainer>
            <TopMenuWrapper>
              <span onClick={() => navigate('/add')}>상품등록</span>
              <span onClick={() => navigate(`/edit/${product.id}`, { state: { product } })}>
              상품수정
              </span>
            <span 
            className={isDeleteModalOpen ? "active" : ""} 
            onClick={() => setIsDeleteModalOpen(true)}
            >
            상품삭제
            </span>
            </TopMenuWrapper>
              <ImageSection>
                  <div className="image-wrapper">
                      <img src={product.image} alt={product.name} />
                  </div>
              </ImageSection>

              <InfoSection>
                  <Price>{product.price.toLocaleString()}원</Price>
                  <Title>{product.name}</Title>
                  <ReviewBox>
                      <span className="star">★ {product.rating || "0.0"}</span>
                      <span className="count">리뷰 {product.reviews || "0"}</span>
                  </ReviewBox>

              

              </InfoSection>
              {isDeleteModalOpen && (
          <ModalOverlay>
            <ModalBox>
              <p>상품을 삭제하시겠습니까?</p>
              <div className="button-group">
                <button className="confirm" onClick={handleDelete}>확인</button>
                <button className="cancel" onClick={() => setIsDeleteModalOpen(false)}>취소</button>
              </div>
            </ModalBox>
          </ModalOverlay>
        )}
          </DetailContainer>
      )
  }