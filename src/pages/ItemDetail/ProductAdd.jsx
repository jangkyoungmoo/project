import styled from "styled-components";
import React, { useState, useRef } from "react";
import arrowIcon2 from "../../assets/images/arrow_image4.png";
import {createItem} from "../../api/shop.js";
import { useNavigate } from "react-router-dom";

export default function ProductAdd() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
    name: "",
    rating: "",
    reviews: "",
    price: "",
    size: "",
    });

    const [selectedType, setSelectedType] = useState("");
    const [selectedGender, setSelectedGender] = useState("");
    const [selectedColor, setSelectedColor] = useState("");
    const [selectedImage, setSelectedImage] = useState(null);
    const fileInputRef = useRef(null);
    const colors = ["red", "pink", "blue", "gray", "black", "denim", "multi", "rainbow", "holographic"];
    const handleBoxClick = () => {
    fileInputRef.current.click();
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async () => {
    if (!formData.name || !formData.price || !selectedType || !selectedGender || !selectedColor || !selectedImage) {
      alert("모든 필드를 입력해주세요.");
      return;
    }

    const newItem = {
      ...formData,
      image: selectedImage,
      type: selectedType,
      gender: selectedGender,
      color: selectedColor,
      price: Number(formData.price),
      rating: Number(formData.rating),
      reviews: Number(formData.reviews),
    };

    try {
      await createItem("clothes", newItem);
      alert("상품이 성공적으로 등록되었습니다.");
      navigate("/");
    } catch (error) {
      console.error("상품 등록 실패:", error);
      alert("상품 등록에 실패했습니다. 다시 시도해주세요.");
    }
  };

  
    return (
    <Container>
      <ImageUploadSection>
        <UploadBox onClick={handleBoxClick}>
          {selectedImage ? (
            <img 
            src={selectedImage} 
            alt="미리보기" 
            style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '20px' }} 
            />
             ) : (
             <>
             <div className="icon">
            <img src={arrowIcon2} alt="화살표" />
        </div>
      </>
    )}
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
          <h2>상품 정보 등록</h2>
          
          <InputGroup>
            <label>상품명</label>
            <input name="name" type="text" value={formData.name} onChange={handleInputChange} />
          </InputGroup>

          <InputGroup>
            <label>평점</label>
            <input name="rating" type="text" value={formData.rating} onChange={handleInputChange} />
          </InputGroup>

          <InputGroup>
            <label>리뷰수</label>
            <input name="reviews" type="text" value={formData.reviews} onChange={handleInputChange} />
          </InputGroup>

          <InputGroup>
            <label>가격</label>
            <input name="price" type="text" value={formData.price} onChange={handleInputChange} />
          </InputGroup>

          <InputGroup>
            <label>사이즈</label>
            <input name="size" type="text" value={formData.size} onChange={handleInputChange} />
          </InputGroup>


          <ButtonGroup>
            <label>종류</label>
            <div className="buttons">
              {["의류", "신발"].map((type) => (
            <SelectButton
              key={type}
              className={selectedType === type ? "active" : ""}
              onClick={() => setSelectedType(type)}
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
                  className={selectedGender === gender ? "active" : ""}
                  onClick={() => setSelectedGender(gender)}
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
                  className={selectedColor === color ? "active" : ""}
                  onClick={() => setSelectedColor(color)}
                >
                  {color}
                </SelectButton>
              ))}
              </ColorButtonGrid>
            </div>
          </ButtonGroup>

          <SubmitButton onClick={handleSubmit}>상품 등록 완료</SubmitButton>
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

const ImageUploadSection = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const UploadBox = styled.div`
 width: 100%;
  aspect-ratio: 1 / 1.2;
  background-color: #f5f5f5;
  border-radius: 20px;
  display: flex;
  flex-direction: column; 
  justify-content: center;
  align-items: center;    
  cursor: pointer;
  img {
      width: 100%;
      height: 100%;
      object-fit: contain;
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