import { Router } from 'express';
import { userRoute } from '../modules/user/user.route';
import { uploadRoute } from '../modules/upload/upload.route';
import { productRoute } from '../modules/product/product.route';
import { bannerRoute } from '../modules/banner/banner.route';
import { processRoute } from '../modules/process/process.route';
import { contactRoute } from '../modules/contact/contact.route';


const route = Router();
const modules = [
  
  {
    path: '/user',
    route: userRoute,
  },
  {
    path: '/upload',
    route: uploadRoute,
  },
  {
    path: '/cap',
    route: productRoute,
  },
  {
    path: '/banner',
    route: bannerRoute,
  },
  {
    path: '/process',
    route: processRoute,
  },
  {
    path: '/contact',
    route: contactRoute,
  },
];

modules.map((el) => route.use(el.path, el.route));
export default route;
