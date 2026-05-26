import styled from "styled-components";
import React, { useState, useRef, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import arrowIcon3 from "../../assets/images/arrow_image5.png";
import {updateItem} from "../../api/shop.js";
import {patchItem} from "../../api/shop.js";

export default function ProductEdit(){
    const { id } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const initialData = location.state?.product;
    const fileInputRef = useRef(null);
    const [formData, setFormData] = useState({
    name: initialData?.name || "",
    rating: initialData?.rating || "",
    reviewCount: initialData?.reviewCount || "",
    price: initialData?.price || "",
    size: initialData?.size || "",
    type: initialData?.type || "",
    gender: initialData?.gender || "",
    color: initialData?.color || "",
    image: initialData?.image || null, 
  });
    const colors = ["red", "pink", "blue", "gray", "black", "denim", "multi", "rainbow", "holographic"];
    const handleBoxClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setFormData({ ...formData, image: reader.result });
      reader.readAsDataURL(file);
    }
  };

  const handlePatchUpdate = async () => {
    const changeData = {};
    Object.keys(formData).forEach((key) => {
      if (formData[key] !== initialData[key]) {
        changeData[key] = formData[key];
      }
    });

    if (Object.keys(changeData).length === 0) {
      alert("수정할 내용이 없습니다.");
      return;
    }

    try {
      if (Object.keys(changeData).length <= 2) {
        console.log("부분 수정을 실행합니다.");

        if (changeData.price) changeData.price = Number(changeData.price);
        if (changeData.rating) changeData.rating = Number(changeData.rating);
        if (changeData.reviewCount) changeData.reviews = Number(changeData.reviewCount);

        await patchItem("clothes", id, changeData);
      } else {
        console.log("전체 수정을 실행합니다.");

        const updatedData = {
          ...formData,
          price: Number(formData.price),
          rating: Number(formData.rating),
          reviews: Number(formData.reviewCount),
        };
        
        await updateItem("clothes", id, updatedData);
      }

      alert("상품 정보가 성공적으로 수정되었습니다.");
      navigate(`/item/${id}`);

    } catch (error) {
      console.error("수정 중 오류 발생:", error);
      alert("수정에 실패했습니다.");
    }
  };
    return (
    <Container>
      <TopMenuWrapper>
        <span onClick={() => navigate("/add")}>상품등록</span>
        <span className="active">상품수정</span>
        <span>상품삭제</span>
      </TopMenuWrapper>
      <ImageUploadSection>
        <UploadBox onClick={() => fileInputRef.current.click()}>
          <img className="main-img" src={formData.image} alt="상품 사진" />
          <div className="overlay">
            <img className="icon" src={arrowIcon3} alt="업로드 아이콘" />
          </div>
        </UploadBox>
        <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        onChange={handleFileChange}
        style={{ display: "none" }}
         />
      </ImageUploadSection>

      <FormSection>
        <FormCard>
          <h2>상품 정보 수정</h2>
          
          <InputGroup>
            <label>상품명</label>
            <input type="text" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} />
          </InputGroup>

          <InputGroup>
            <label>평점</label>
            <input type="text" value={formData.rating} onChange={(e) => setFormData({...formData, rating: e.target.value})} />
          </InputGroup>

          <InputGroup>
            <label>리뷰수</label>
            <input type="text" value={formData.reviewCount} onChange={(e) => setFormData({...formData, reviewCount: e.target.value})} />
          </InputGroup>

          <InputGroup>
            <label>가격</label>
            <input type="text" value={formData.price} onChange={(e) => setFormData({...formData, price: e.target.value})} />
          </InputGroup>

          <InputGroup>
            <label>사이즈</label>
            <input type="text" value={formData.size} onChange={(e) => setFormData({...formData, size: e.target.value})} />
          </InputGroup>


          <ButtonGroup>
            <label>종류</label>
            <div className="buttons">
              {["의류", "신발"].map((type) => (
            <SelectButton 
                  key={type} 
                  className={formData.type === type ? "active" : ""} 
                  onClick={() => setFormData({...formData, type: type})}
                >
                  {type}
              
            </SelectButton>
              ))}
            </div>
          </ButtonGroup>

          <ButtonGroup>
            <label>성별</label>
            <div className="buttons">
              {["남성", "여성", "남녀공용"].map((gender) => (
                <SelectButton
                  key={gender}
                  className={formData.gender === gender ? "active" : ""}
                  onClick={() => setFormData({...formData, gender: gender})}
                >
                  {gender}
                </SelectButton>
              ))}
            </div>
          </ButtonGroup>

          <ButtonGroup>
            <label>색상</label>
            <div className="buttons">
              <ColorButtonGrid>   
              {colors.map((color) => (
                <SelectButton
                  key={color}
                  className={formData.color === color ? "active" : ""}
                  onClick={() => setFormData({...formData, color: color})}
                >
                  {color}
                </SelectButton>
              ))}
              </ColorButtonGrid>
            </div>
          </ButtonGroup>

          <SubmitButton onClick={handlePatchUpdate}>
            상품 수정 완료
          </SubmitButton>
        </FormCard>
      </FormSection>
    </Container>
  );
}


const Container = styled.div`
  display: flex;
  padding: 60px 160px;
  gap: 80px;
  max-width: 1200px;
  margin: 0 auto;
`;

const TopMenuWrapper = styled.div`
  position: absolute;
  top:0;
  right: 130px;
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

const ImageUploadSection = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const UploadBox = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 1 / 1.2;
  border: none;
  overflow: hidden;
  cursor: pointer;

  .main-img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    background-color: #fff;
  }

  .overlay {
    position: absolute;
    top: 0; left: 0;
    width: 100%; height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background: rgba(0, 0, 0, 0.05);
    background: transparent;

    .icon {
      width: 50px;
      height: auto;
      margin-bottom: 15px;
      opacity: 0.7; 
    }
  }
`;

const FormSection = styled.div`
  flex: 1;
  border-left: 1px solid #ebebeb;
  padding-left: 80px;
`;

const FormCard = styled.div`
  background: white;
  padding: 40px;
  border-radius: 30px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.05);
  border: 1px solid #eee;
  
  h2 { margin-bottom: 30px; font-size: 20px; }
`;

const InputGroup = styled.div`
  margin-bottom: 15px;
  label { display: block; font-size: 12px; color: #888; margin-bottom: 5px; }
  input {
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 8px;
    box-sizing: border-box;
  }
`;

const ButtonGroup = styled.div`
  margin-bottom: 20px;
  label { display: block; font-size: 12px; color: #888; margin-bottom: 8px; }
  .buttons {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  }
`;

const SubmitButton = styled.button`
  width: 100%;
  padding: 15px;
  background: #f0f0f0;
  border: none;
  border-radius: 10px;
  color: #888;
  font-weight: bold;
  margin-top: 20px;
  cursor: pointer;
`;

const SelectButton = styled.button`
  padding: 10px 20px;
  background-color: #f5f6f7;
  color: #555;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  font-size: 14px;
  border: none;

  &.active {
    background-color: #e0e3e7;
    border-color: #a0a8b3;
    color: #333;
  }

  &:hover {
    background-color: #e8eaed;
  }
`;

const ColorButtonGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr); 
  gap: 10px; 
  width: 100%; 
  max-width: 300px;
`;