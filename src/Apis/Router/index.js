import React from "react";
import { ROUTES } from "./routes";
import { BrowserRouter } from "react-router-dom";
import { Routes, Route, Navigate } from "react-router-dom";
import { PublicLayout, PrivateLayout } from "../Components/Layouts";
import OrderPlaced from "../Pages/Dashboard/OrderPlaced";
import Checkout from "../Pages/Dashboard/Checkout";
import About from "../Pages/About";
import {
  HomePage,
  ProductsPage,
  PricingPage,
  LoginPage,
  ProfileBuildPage,
  DesignerCompleteProfilePage,
  ContractorCompleteProfilePage,
  LeadsPage,
  LeadDetailPage,
  UploadProjectPage,
  TagProjectPage,
  ProjectSummaryPage,
  MyProfilePage,
  PlansPage,
  PrivacyPolicyPage,
  DiscountDocumentPage,
  ContactPage,
  RequestPage,
  AllProjectsPage,
  TermsPage,
  CookiePage,
  GoPremiumPage,
  ResetPasswordPage,
  AddPhotos,
} from "../Pages";
import Brand from "../Pages/Dashboard/Brand";
import BrandDetails from "../Pages/Dashboard/Brand/BrandDetails";
import { useSelector } from "react-redux";
import { USER_TYPE } from "../Constants/enums";
import BrandOffer from "../Pages/BrandOffer";
import ContractorProfile from "../Pages/Dashboard/ContractorProfile";

const Router = () => {
  const type = useSelector((state) => state.auth.type);
  const isProjectsAdded = useSelector((state) => state.auth.isProjectsAdded);
  const isPricesAdded = useSelector((state) => state.auth.isPricesAdded);
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PublicLayout />}>
          <Route index element={<HomePage />} />
          <Route path={ROUTES.LOGIN} element={<LoginPage />} />
          <Route path={ROUTES.RESET_PASSWORD} element={<ResetPasswordPage />} />
          <Route path={ROUTES.PRODUCTS} element={<ProductsPage />} />
          <Route path={ROUTES.PRICING} element={<PricingPage />} />
          <Route path={ROUTES.BRAND_OFFERS} element={<Brand />} />
          <Route path={ROUTES.PROFILE_BUILD} element={<ProfileBuildPage />} />
          <Route path={ROUTES.ABOUT_US} element={<About />} />
          <Route path={ROUTES.PRIVACY_POLICY} element={<PrivacyPolicyPage />} />
          <Route path={ROUTES.TERMS_AND_CONDITIONS} element={<TermsPage />} />
          <Route path={ROUTES.COOKIE_POLICY} element={<CookiePage />} />
          <Route path={ROUTES.REQUEST} element={<RequestPage />} />
          <Route path={ROUTES.CONTACT} element={<ContactPage />} />
          <Route path={ROUTES.BRAND_OFFERS1} element={<BrandOffer />} />
        </Route>

        <Route element={<PrivateLayout />}>
          <Route
            path={ROUTES.DASHBOARD}
            element={
              isPricesAdded && isProjectsAdded ? (
                <Navigate to={ROUTES.LEADS} />
              ) : !isPricesAdded ? (
                <Navigate to={ROUTES.COMPLETE_PROFILE} />
              ) : !isProjectsAdded ? (
                <Navigate to={ROUTES.UPLOAD_PROJECT} />
              ) : (
                <Navigate to={ROUTES.COMPLETE_PROFILE} />
              )
            }
          />
          <Route
            path={ROUTES.COMPLETE_PROFILE}
            element={
              type === USER_TYPE.DESIGNER ? (
                <DesignerCompleteProfilePage />
              ) : (
                <ContractorCompleteProfilePage />
              )
            }
          />
          <Route path={ROUTES.UPLOAD_PROJECT} element={<UploadProjectPage />} />

          <Route path={ROUTES.LEADS}>
            <Route path={ROUTES.LEADS} element={<LeadsPage />} />
            <Route path={ROUTES.ID} element={<LeadDetailPage />} />
          </Route>

          <Route path={ROUTES.ORDER_PLACED} element={<OrderPlaced />} />
          <Route
            path={`${ROUTES.CHECKOUT}/${ROUTES.ID}`}
            element={<Checkout />}
          />
          <Route path={ROUTES.PLANS} element={<PlansPage />} />
          <Route
            path={ROUTES.PROJECT_SUMMARY}
            element={<ProjectSummaryPage />}
          />
          <Route path={ROUTES.TAG_PROJECT} element={<TagProjectPage />} />
          <Route path={ROUTES.MY_PROFILE} element={<MyProfilePage />} />
          <Route path={ROUTES.ALL_PROJECTS} element={<AllProjectsPage />} />
          <Route
            path={ROUTES.DISCOUNT_DOCUMENT}
            element={<DiscountDocumentPage />}
          />
          <Route path={ROUTES.BRAND} element={<Brand />} />
          <Route path={ROUTES.BRAND_DETAILS} element={<BrandDetails />} />
          <Route path={ROUTES.GO_PREMIUM} element={<GoPremiumPage />} />
          <Route
            path={ROUTES.CONTRACTOR_PROFILE}
            element={<ContractorProfile />}
          />
          <Route path={ROUTES.ADD_PHOTOS} element={<AddPhotos />} />
        </Route>

        <Route path="*" element={<Navigate to={ROUTES.APP} replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
