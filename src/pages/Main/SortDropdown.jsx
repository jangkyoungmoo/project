import styled from "styled-components";

const DropdownMenu = styled.div`
  position: absolute;
  top: 30px; 
  right: 0;
  background: white;
  border-radius: 15px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  padding: 10px;
  z-index: 100;
  width: 140px;
`;

const SortItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 15px;
  font-size: 14px;
  cursor: pointer;
  color: ${(props) => (props.isActive ? "#222" : "#aaa")}; 
  font-weight: ${(props) => (props.isActive ? "700" : "400")};

  img {
    width: 12px;
    height: auto;
  }

  &:hover {
    background-color: #f9f9f9;
    border-radius: 10px;
  }
`;

export default function SortDropdown({ currentSort, onSelect, checkIcon }) {
  const sortList = ["기본 정렬순", "평점 높은순", "리뷰 많은순"];

  return (
    <DropdownMenu>
      {sortList.map((name) => (
        <SortItem 
          key={name} 
          isActive={currentSort === name} 
          onClick={() => onSelect(name)}
        >
          {name}
          {currentSort === name && <img src={checkIcon} alt="선택됨" />}
        </SortItem>
      ))}
    </DropdownMenu>
  );
}