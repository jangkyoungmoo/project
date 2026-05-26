import styled from "styled-components";
import logoUrl from "../../assets/images/kream_image.png";
import homeUrl from "../../assets/icons/home_icon.png";
import { useLocation, useNavigate } from "react-router-dom";

const LogoImage = styled.img`
    width: 166px;
    height: 141px;
    cursor: pointer;
`;

const HomeIcon = styled.img`
    width: 61px;
    height: 24px;
`;

const HeaderContainer = styled.div`
    padding-right: 160px;
    padding-left: 160px;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const Button = styled.div`
    color: #6C6C6C;
    font-size: 13px;
    font-family: Pretendard;
    font-weight: 400;
    margin-top: 9px;
    cursor: pointer;
    &.active {
        font-weight: 400; 
        color: #000;     
    }
    &:hover {
        color: #222;
    }
`;

const HeaderRight = styled.div`
    flex-direction: column;
    display: flex;
    align-items: flex-end;
    gap: 36px;
`;

const TopMenu = styled.div`
    top: -20px;  
    right: 0;
`;

const BottomMenu = styled.div`
    display: flex;
    align-items: center;
    height: 40px;
    cursor: pointer;
`;

export default function Header() {
    const { pathname } = useLocation();
    const navigate = useNavigate();
    const buttonName = "상품등록";
    const isAddPage = pathname === "/add";


    const handlePost = () => {
        navigate("/add");
    };

    return (
        <div>
            <HeaderContainer>
                <LogoImage 
                    src={logoUrl} 
                    onClick={() => navigate("/")}
                />
                <HeaderRight>
                    <TopMenu>
                        {(pathname === "/" || pathname === "/add") && (
                            <Button 
                                onClick={handlePost} 
                                className={isAddPage ? "active" : ""}
                            >
                                {buttonName}
                            </Button>
                        )}
                    </TopMenu>
                    <BottomMenu onClick={() => navigate("/")}>
                        <HomeIcon src={homeUrl}/>
                    </BottomMenu>
                </HeaderRight>
            </HeaderContainer>
        </div>
    );
}