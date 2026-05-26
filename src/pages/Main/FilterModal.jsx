import styled from "styled-components";

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
`;

const ModalBox = styled.div`
  background-color: white;
  width: 400px;
  border-radius: 20px;
  padding: 30px;
  position: relative;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);

  h2 {
    font-size: 18px;
    font-weight: 700;
    margin-bottom: 20px;
    text-align: left;
  }

  .close-btn {
    position: absolute;
    top: 20px;
    right: 20px;
    cursor: pointer;
    background: none;
    border: none;
    font-size: 20px;
  }

  .button-group {
    display: flex;
    justify-content: center;
    gap: 10px;
    flex-wrap: wrap;
    
    button {
      width: calc((100% - 24px) / 3);
      padding: 12px 0;
      border-radius: 30px;
      border: none;
      background-color: #f4f4f4;
      font-size: 14px;
      cursor: pointer;
      color: #222;

      &:hover {
        background-color: #eee;
      }
    }
  }
`;

const modalData = {
  gender: {
    title: "성별",
    options: ["남성", "여성", "남녀공용"],
  },
  color: {
    title: "색상",
    options: ["red", "pink", "blue", "black", "gray", "denim", "multi", "rainbow", "holographic"],
  },
  size: {
    title: "사이즈",
    options: ["9", "10", "S", "M", "L", "XL"],
  },
  price: {
    title: "가격대",
    options: ["0~30", "31~60", "60~90"],
  },
  category: {
    title: "종류",
    options: ["의류", "신발"],
  },
};

export default function FilterModal({ type, onClose, onSelect }) {
  const currentData = modalData[type] || modalData.gender;

  return (
    <ModalOverlay onClick={onClose}>
      <ModalBox onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>✕</button>
        
        <h2>{currentData.title}</h2>
        
        <div className="button-group">
          {currentData.options.map((option, index) => (
            <button 
              key={index} 
              onClick={() => {
                onSelect(option); 
                onClose();       
              }}
            >
              {option}
            </button>
          ))}
        </div>
      </ModalBox>
    </ModalOverlay>
  );
}