// ** Reactstrap Imports
import { Card, CardImg } from 'reactstrap';

const HeroArea = ({ data }) => {
  return (
    <Card className="profile-header mb-2">
      <CardImg
        src={require('@src/assets/images/banner/burger-shop-cover.jpg').default}
        alt="User Profile Image"
        top
      />
      {/* <div className="position-relative">
                <div className="profile-img-container d-flex align-items-center">
                    <div className="profile-title ms-3">
                        <h2 className="text-white">Backyard Burgers</h2>
                        <p className="text-white">Best Burger In Town</p>
                    </div>
                </div>
            </div> */}
    </Card>
  );
};

export default HeroArea;
