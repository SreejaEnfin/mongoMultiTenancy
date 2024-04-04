import { Connection } from 'mongoose';
import { ProductSchema } from 'src/products/products.schema';

export const tenantModels = {
  productModel: {
    provide: 'PRODUCT_MODEL',
    useFactory: async (tenantConnection: Connection) => {
      return tenantConnection.model('Product', ProductSchema);
    },
    inject: ['TENANT_CONNECTION'],
  },
};
