import { API_URL_DANTRI, BASE_API } from '.';
import instance from '../api/axios';
import axios from '../api/axios';
// export default class NewsServices{
//     static getArticles = async({categoryId , page , pageSize})  => {
//         return instance.get(API_URL_DANTRI,BASE_API.getListFootballNews, {
//           params: { 
//             categoryId: categoryId,
//             page:page, 
//             pageSize:pageSize }
//         });
//       }
//       static getExtractArticleContentById = async({articleId})  => {
//         return instance.get(API_URL_DANTRI,BASE_API.getListFootballNews, {
//           params: { 
//             articleId:articleId,
//              }
//         });
//       }
// };

export default class NewsServices {
  static getArticles = async ({ categoryId, page, pageSize }) => {
    try {
      const response = await instance.get(BASE_API.getListFootballNews, {
        params: {
          categoryId: categoryId,
          page: page,
          pageSize: pageSize
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching articles:', error);
      throw error;
    }
  }

  static getExtractArticleContentById = async ({ articleId }) => {
    try {
      const response = await instance.get(BASE_API.getExtractArticleContentById, {
        params: {
          articleId: articleId
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching article content:', error);
      throw error;
    }
  }
}