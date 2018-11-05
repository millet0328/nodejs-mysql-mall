define({ "api": [
  {
    "type": "post",
    "url": "/users/address/add/",
    "title": "添加收货地址",
    "name": "_address_add_",
    "group": "Address",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "uid",
            "description": "<p>用户id.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>收货人姓名.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "tel",
            "description": "<p>电话.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "province",
            "description": "<p>省.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "city",
            "description": "<p>市.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "area",
            "description": "<p>区.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "street",
            "description": "<p>街道.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "code",
            "description": "<p>邮编.</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "isDefault",
            "description": "<p>是否默认 1-默认,0-否.</p>"
          }
        ]
      }
    },
    "sampleRequest": [
      {
        "url": "/users/address/add/"
      }
    ],
    "version": "0.0.0",
    "filename": "routes/users.js",
    "groupTitle": "Address"
  },
  {
    "type": "post",
    "url": "/users/address/delete/",
    "title": "删除收货地址",
    "name": "_address_delete_",
    "group": "Address",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>收货地址id.</p>"
          }
        ]
      }
    },
    "sampleRequest": [
      {
        "url": "/users/address/delete/"
      }
    ],
    "version": "0.0.0",
    "filename": "routes/users.js",
    "groupTitle": "Address"
  },
  {
    "type": "get",
    "url": "/users/address/detail/",
    "title": "根据id获取收货地址详情",
    "name": "_address_detail_",
    "group": "Address",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>收货地址id.</p>"
          }
        ]
      }
    },
    "sampleRequest": [
      {
        "url": "/users/address/detail/"
      }
    ],
    "version": "0.0.0",
    "filename": "routes/users.js",
    "groupTitle": "Address"
  },
  {
    "type": "get",
    "url": "/users/address/list/",
    "title": "获取收货地址列表",
    "name": "_address_list_",
    "group": "Address",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "uid",
            "description": "<p>用户id.</p>"
          }
        ]
      }
    },
    "sampleRequest": [
      {
        "url": "/users/address/list/"
      }
    ],
    "version": "0.0.0",
    "filename": "routes/users.js",
    "groupTitle": "Address"
  },
  {
    "type": "post",
    "url": "/users/address/update/",
    "title": "修改收货地址",
    "name": "_address_update_",
    "group": "Address",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>收货地址id.</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "uid",
            "description": "<p>用户id.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>收货人姓名.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "tel",
            "description": "<p>电话.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "province",
            "description": "<p>省.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "city",
            "description": "<p>市.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "area",
            "description": "<p>区.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "street",
            "description": "<p>街道.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "code",
            "description": "<p>邮编.</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "isDefault",
            "description": "<p>是否默认.1-默认,0-否.</p>"
          }
        ]
      }
    },
    "sampleRequest": [
      {
        "url": "/users/address/update/"
      }
    ],
    "version": "0.0.0",
    "filename": "routes/users.js",
    "groupTitle": "Address"
  },
  {
    "type": "post",
    "url": "/api/category/add/",
    "title": "添加子分类",
    "name": "category_add______",
    "group": "Category",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>分类名称.</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "pId",
            "description": "<p>父级id.</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "level",
            "description": "<p>分类所在层级.</p>"
          }
        ]
      }
    },
    "sampleRequest": [
      {
        "url": "/api/category/add/"
      }
    ],
    "version": "0.0.0",
    "filename": "routes/admin.js",
    "groupTitle": "Category"
  },
  {
    "type": "get",
    "url": "/api/category/all/",
    "title": "获取所有树形分类",
    "name": "category_all_________",
    "group": "Category",
    "sampleRequest": [
      {
        "url": "/api/category/all/"
      }
    ],
    "version": "0.0.0",
    "filename": "routes/admin.js",
    "groupTitle": "Category"
  },
  {
    "type": "post",
    "url": "/api/category/delete/",
    "title": "删除分类",
    "name": "category_delete_____",
    "group": "Category",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>分类id.</p>"
          }
        ]
      }
    },
    "sampleRequest": [
      {
        "url": "/api/category/delete/"
      }
    ],
    "version": "0.0.0",
    "filename": "routes/admin.js",
    "groupTitle": "Category"
  },
  {
    "type": "get",
    "url": "/api/category/sub/",
    "title": "获取子级分类",
    "name": "category_sub",
    "group": "Category",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "pId",
            "description": "<p>父级分类id。注：获取一级分类pId=1;</p>"
          }
        ]
      }
    },
    "sampleRequest": [
      {
        "url": "/api/category/sub/"
      }
    ],
    "version": "0.0.0",
    "filename": "routes/admin.js",
    "groupTitle": "Category"
  },
  {
    "type": "post",
    "url": "/api/category/update/",
    "title": "更新分类",
    "name": "category_update_____",
    "group": "Category",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>分类id.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>分类名称.</p>"
          }
        ]
      }
    },
    "sampleRequest": [
      {
        "url": "/api/category/update/"
      }
    ],
    "version": "0.0.0",
    "filename": "routes/admin.js",
    "groupTitle": "Category"
  },
  {
    "type": "get",
    "url": "/api/goods/",
    "title": "获取商品列表",
    "description": "<p>具备商品分页功能</p>",
    "name": "_goods________",
    "group": "Goods",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "pageSize",
            "description": "<p>一个页有多少个商品,默认4个;</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "pageIndex",
            "description": "<p>第几页,默认1;</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "cate_1st",
            "description": "<p>一级分类id;</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "cate_2nd",
            "description": "<p>二级分类id;</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "cate_3rd",
            "description": "<p>三级分类id;</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "sortByPrice",
            "description": "<p>按照价格排序，从小到大-ASC,从大到小-DESC;</p>"
          }
        ]
      }
    },
    "sampleRequest": [
      {
        "url": "/api/goods/"
      }
    ],
    "version": "0.0.0",
    "filename": "routes/index.js",
    "groupTitle": "Goods"
  },
  {
    "type": "post",
    "url": "/api/goods/delete/",
    "title": "删除商品",
    "name": "goods_delete_",
    "group": "Goods",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>商品id;</p>"
          }
        ]
      }
    },
    "sampleRequest": [
      {
        "url": "/api/goods/delete/"
      }
    ],
    "version": "0.0.0",
    "filename": "routes/admin.js",
    "groupTitle": "Goods"
  },
  {
    "type": "post",
    "url": "/api/goods/edit/",
    "title": "编辑商品",
    "name": "goods_edit_",
    "group": "Goods",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>商品id;</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "cate_1st",
            "description": "<p>一级分类id;</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "cate_2nd",
            "description": "<p>二级分类id;</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "cate_3rd",
            "description": "<p>三级分类id;</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>商品名称;</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "hotPoint",
            "description": "<p>商品热点描述;</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "price",
            "description": "<p>商品价格;</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "marketPrice",
            "description": "<p>市场价;</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "cost",
            "description": "<p>成本价;</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "discount",
            "description": "<p>折扣如：75%;</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "inventory",
            "description": "<p>商品库存;</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "articleNo",
            "description": "<p>商品货号;</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "img_lg",
            "description": "<p>商品主图-720;</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "img_md",
            "description": "<p>商品主图-360;</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "slider",
            "description": "<p>商品轮播图片，例：slider:'src1,src2,src3';</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "brand",
            "description": "<p>商品品牌;</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "detail",
            "description": "<p>商品详情,一般存储为HTML代码;</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "freight",
            "description": "<p>商品运费;</p>"
          }
        ]
      }
    },
    "sampleRequest": [
      {
        "url": "/api/goods/edit/"
      }
    ],
    "version": "0.0.0",
    "filename": "routes/admin.js",
    "groupTitle": "Goods"
  },
  {
    "type": "post",
    "url": "/api/goods/release/",
    "title": "发布新商品",
    "name": "goods_release_",
    "group": "Goods",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "cate_1st",
            "description": "<p>一级分类id;</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "cate_2nd",
            "description": "<p>二级分类id;</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "cate_3rd",
            "description": "<p>三级分类id;</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>商品名称;</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "hotPoint",
            "description": "<p>商品热点描述;</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "price",
            "description": "<p>商品价格;</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "marketPrice",
            "description": "<p>市场价;</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "cost",
            "description": "<p>成本价;</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "discount",
            "description": "<p>折扣如：75%;</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "inventory",
            "description": "<p>商品库存;</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "articleNo",
            "description": "<p>商品货号;</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "img_lg",
            "description": "<p>商品主图-720;</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "img_md",
            "description": "<p>商品主图-360;</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "slider",
            "description": "<p>商品轮播图片，例：slider:'src1,src2,src3';</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "brand",
            "description": "<p>商品品牌;</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "detail",
            "description": "<p>商品详情,一般存储为HTML代码;</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "freight",
            "description": "<p>商品运费;</p>"
          }
        ]
      }
    },
    "sampleRequest": [
      {
        "url": "/api/goods/release/"
      }
    ],
    "version": "0.0.0",
    "filename": "routes/admin.js",
    "groupTitle": "Goods"
  },
  {
    "type": "post",
    "url": "/api/upload/common/",
    "title": "通用图片上传API",
    "description": "<p>上传图片会自动检测图片质量，压缩图片，体积&lt;2M，不限制尺寸，存储至details文件夹</p>",
    "name": "upload_common_",
    "group": "Upload_Image",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "File",
            "optional": false,
            "field": "file",
            "description": "<p>File文件对象;</p>"
          }
        ]
      }
    },
    "sampleRequest": [
      {
        "url": "/api/upload/common/"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String[]",
            "optional": false,
            "field": "data",
            "description": "<p>返回图片地址.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/admin.js",
    "groupTitle": "Upload_Image"
  },
  {
    "type": "post",
    "url": "/api/upload/goods/",
    "title": "上传商品主图",
    "description": "<p>上传图片会自动检测图片质量，压缩图片，体积&lt;2M，尺寸（300~1500），存储至goods文件夹</p>",
    "name": "upload_goods_",
    "group": "Upload_Image",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "File",
            "optional": false,
            "field": "file",
            "description": "<p>File文件对象;</p>"
          }
        ]
      }
    },
    "sampleRequest": [
      {
        "url": "/api/upload/goods/"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "lgImg",
            "description": "<p>返回720宽度图片地址.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "mdImg",
            "description": "<p>返回360宽度图片地址.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/admin.js",
    "groupTitle": "Upload_Image"
  },
  {
    "type": "post",
    "url": "/api/upload/slider/",
    "title": "轮播图上传API",
    "description": "<p>上传图片会自动检测图片质量，压缩图片，体积&lt;2M，尺寸（300~1500）必须是正方形，存储至goods文件夹</p>",
    "name": "upload_slider_",
    "group": "Upload_Image",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "File",
            "optional": false,
            "field": "file",
            "description": "<p>File文件对象;</p>"
          }
        ]
      }
    },
    "sampleRequest": [
      {
        "url": "/api/upload/slider/"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "src",
            "description": "<p>返回720宽度图片地址.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/admin.js",
    "groupTitle": "Upload_Image"
  },
  {
    "type": "get",
    "url": "/users/info/",
    "title": "获取个人资料",
    "name": "_info_______",
    "group": "User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "uid",
            "description": "<p>用户id.</p>"
          }
        ]
      }
    },
    "sampleRequest": [
      {
        "url": "/users/info"
      }
    ],
    "version": "0.0.0",
    "filename": "routes/users.js",
    "groupTitle": "User"
  },
  {
    "type": "post",
    "url": "/users/updateInfo/",
    "title": "更新个人资料",
    "name": "_updateInfo_______",
    "group": "User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "uid",
            "description": "<p>用户id.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "nickname",
            "description": "<p>昵称.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "sex",
            "description": "<p>性别.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "avatar",
            "description": "<p>头像.</p>"
          }
        ]
      }
    },
    "sampleRequest": [
      {
        "url": "/users/updateInfo"
      }
    ],
    "version": "0.0.0",
    "filename": "routes/users.js",
    "groupTitle": "User"
  },
  {
    "type": "post",
    "url": "/users/login/",
    "title": "登录",
    "name": "login___",
    "group": "User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>用户账户名.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>用户密码.</p>"
          }
        ]
      }
    },
    "sampleRequest": [
      {
        "url": "/users/login"
      }
    ],
    "version": "0.0.0",
    "filename": "routes/users.js",
    "groupTitle": "User"
  },
  {
    "type": "post",
    "url": "/users/register/",
    "title": "注册",
    "name": "register___",
    "group": "User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>用户账户名.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>用户密码.</p>"
          }
        ]
      }
    },
    "sampleRequest": [
      {
        "url": "/users/register"
      }
    ],
    "version": "0.0.0",
    "filename": "routes/users.js",
    "groupTitle": "User"
  }
] });
