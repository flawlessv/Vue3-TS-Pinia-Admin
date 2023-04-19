import lwjRequest from "..";

export function getGoodsAmountListData() {
  return lwjRequest.get({
    url: "/goods/amount/list"
  });
}

export function getGoodsCategoryCount() {
  return lwjRequest.get({
    url: "/goods/category/count"
  });
}

export function getGoodsCategorySale() {
  return lwjRequest.get({
    url: "/goods/category/sale"
  });
}

export function getGoodsCategoryFavor() {
  return lwjRequest.get({
    url: "/goods/category/favor"
  });
}

export function getGoodsAddressSale() {
  return lwjRequest.get({
    url: "/goods/address/sale"
  });
}
