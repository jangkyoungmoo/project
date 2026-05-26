import styled from "styled-components";
import arrowIcon from "../../assets/images/arrow_image1.png";

const FilterContainer = styled.div`
  display: flex;
  gap: 13px;
  margin-top: 22px;
  margin-bottom: 61px;

  button {
    padding: 8px 16px;
    border: none;
    border-radius: 20px;
    background-color: #F2F2F2;
    font-size: 13px;
    color: #222;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    gap: 5px;
    &:hover { background-color: #ebebeb; }
    
    img { width: 10px; height: auto; }
  }
`;

export default function FilterBar({ onGenderClick, onColorClick, onSizeClick, onPriceClick, onCategoryClick }) { 
  return (
    <FilterContainer>
      
      <button onClick={onGenderClick}>
        성별 <img src={arrowIcon} alt="화살표" />
      </button>
      <button onClick={onColorClick}>
        색상 <img src={arrowIcon} alt="화살표" />
      </button>
      <button onClick={onSizeClick}>
        사이즈 <img src={arrowIcon} alt="화살표" />
      </button>
      <button onClick={onPriceClick}>
        가격대 <img src={arrowIcon} alt="화살표" />
      </button>
      <button onClick={onCategoryClick}>
        종류 <img src={arrowIcon} alt="화살표" />
      </button>
    </FilterContainer>
  );
}