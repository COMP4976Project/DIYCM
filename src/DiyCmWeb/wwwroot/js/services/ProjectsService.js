(function() {
  var ProjectsService = function ($http, $q) {
    var baseUrl = 'http://diycm-api.azurewebsites.net/api/Projects/';
    var url = 'http://diycm-api.azurewebsites.net/api/';
    //var baseUrl = 'http://localhost:5000/api/Projects/';


    var _getProject = function (id) {
        return $http.get(baseUrl + id)
         .then(function (response) {
             return response.data;
         });
    };

    var _addProject = function (data) {
      $.support.cors = true;
       return $http.post(baseUrl, data)
         .then(function (response) {
             return response.data;
         });
   };

   var _editProject = function (data, id) {
     $.support.cors = true;
      return $http.put(baseUrl + id, data)
        .then(function (response) {
            return response.data;
        });
  };

  var _deleteProject = function (id) {
    $.support.cors = true;
    return $http.delete(baseUrl + id)
      .then(function (response) {
        return response.data;
      });
  };

    var _getAllProjects = function () {
        return $http.get(baseUrl)
          .then(function (response) {
              return response.data;
          });
    };

    var _getProjectInfo = function(id){
          var reqCategories     = $http.get(url + 'categories');
          var reqSubCategories  = $http.get(url + 'subcategories');
          var reqProjects       = $http.get(url + 'projects/' + id);
          var reqQuoteDetails   = $http.get(url + 'quotedetails/');
          var reqQuoteHeaders   = $http.get(url + 'quoteheaders/');
          var reqAreas          = $http.get(url + 'areas/');
          var reqInvoiceDetails = $http.get(url + 'supplierinvoicedetails/');
          var reqInvoiceHeaders = $http.get(url + 'supplierinvoiceheaders/');

          // Both Main Categories + Sub categories
          var allProjectCategories    = new Array();
          var allProjectSubCategories = new Array();
          var allInfo          = new Array();
          var allQuoteDetails         = new Array();
          var allQuoteHeaders         = new Array();
          var allAreas                = new Array();
          var allInvoiceDetails       = new Array();
          var allInvoiceHeaders       = new Array();

          return $q.all([reqCategories, reqProjects, reqSubCategories, reqQuoteDetails, reqQuoteHeaders, reqAreas,reqInvoiceDetails,reqInvoiceHeaders]).then(function (values) {
              var categories     = values[0].data;
              var project        = values[1].data;
              var subcategories  = values[2].data;
              var quotedetails   = values[3].data;
              var quoteheaders   = values[4].data;
              var areas          = values[5].data;
              var invoicedetails = values[6].data;
              var invoiceheaders = values[7].data;

              //Iterate through each category
              categories.forEach(function (category) {
                var allSubcategories = new Array();
                      //Find the corresponding categories for the project
                      if (id == category.ProjectId) {
                        var obj = {
                          CategoryId      : category.CategoryId,
                          CategoryName    : category.CategoryName,
                          Description     : category.Description,
                          BudgetAmount    : category.BudgetAmount,
                          ActualAmount    : category.ActualAmount,
                          PercentCompleted: category.PercentCompleted,
                          VarianceAmount  : category.VarianceAmount,
                          SubCategories   : allSubcategories
                        };
                        //Iterate through each subcategory
                        var subcat = new Array();   //Used to store all subcategories for a main Category
                        subcategories.forEach(function (subcategory) {
                          //Find all subcategories for the current category
                          if(category.CategoryId == subcategory.CategoryId){
                            var sub = {
                              SubCategoryId    : subcategory.SubCategoryId,
                              SubCategoryName  : subcategory.SubCategoryName,
                              Description      : subcategory.Description,
                              CategoryId       : subcategory.CategoryId,
                              CategoryName     : category.CategoryName,
                              //Category         : subcategory.,
                              BudgetAmount     : subcategory.BudgetAmount,
                              ActualAmount     : subcategory.ActualAmount,
                              VarianceAmount   : subcategory.VarianceAmount,
                              PercentCompleted : subcategory.PercentCompleted
                            }
                            //Add the subcategory to the current main category
                            subcat.push(sub);
                            obj.SubCategories.push(sub); //Optional
                          }
                        });

                        var SubCategoriesForArray  = {
                          CategoryName  : category.CategoryName,
                          CategoryId    : category.CategoryId,
                          SubCategories : subcat
                        };
                        //Add the category
                        allProjectCategories.push(obj);
                        if(subcat.length > 0)
                          allProjectSubCategories.push(SubCategoriesForArray);

                      }
              });

              //All QuoteHeaders
              var quoteheaderarr = new Array();
              quoteheaders.forEach(function (quoteheader) {
                var quote = {
                  QuoteHeaderId : quoteheader.QuoteHeaderId,
                  QuoteHeader : quoteheader,
                  QuoteDetails : new Array(),
                  SubCategoryId : null,
                  CategoryId: null,
                  CategoryName: null,
                  SubCategoryName: null
                }
                quoteheaderarr.push(quote);
              });

              areas.forEach(function (area) {
                var a = {
                  AreaId            : area.AreaId,
                  AreaRoom          : area.AreaRoom,
                  AreaSquareFootage : area.AreaSquareFootage
                }
                allAreas.push(a);
              });


              quoteheaderarr.forEach(function (quote){
                allProjectSubCategories.forEach(function (sub) {
                  sub.SubCategories.forEach(function (subcat) {
                      quotedetails.forEach(function (quotedetail){
                          if(subcat.SubCategoryId == quotedetail.SubCategoryId &&
                                quote.QuoteHeaderId == quotedetail.QuoteHeaderId){
                                quotedetail['SubCategoryName'] = subcat.SubCategoryName;
                                quote.SubCategoryId = quotedetail.SubCategoryId;
                                quote.CategoryId = quotedetail.CategoryId;
                                quote.CategoryName = subcat.CategoryName;
                                quote.SubCategoryName = subcat.SubCategoryName;
                                allAreas.forEach(function (a) {
                                if(quotedetail.AreaId == a.AreaId)
                                  quotedetail['AreaRoom'] = a.AreaRoom;
                                });
                                quote.QuoteDetails.push(quotedetail);
                          }
                      });
                      invoicedetails.forEach(function (invoicedetail){
                          if(subcat.SubCategoryId == invoicedetail.SubCategoryId){

                          }
                      });
                  });
                });
              });

              //Remove any quoteheaders without any quotedetails
              var finalquoteheaderarr = new Array();
              quoteheaderarr.forEach(function (quo){
                if(quo.QuoteDetails.length != 0){
                  finalquoteheaderarr.push(quo);
                }
              });

              console.log("==============");
              //console.log(finalquoteheaderarr);
              console.log(subcategories);

              finalquoteheaderarr.forEach(function(fquoteheader){
                  invoiceheaders.forEach(function(invoiceheader){
                      if(invoiceheader.QuoteHeaderId == fquoteheader.QuoteHeaderId){
                        var invoice = {
                          InvoiceHeader  : invoiceheader,
                          InvoiceDetails : new Array(),
                          CategoryName   : fquoteheader.CategoryName
                        };
                        invoicedetails.forEach(function(invoicedetail){
                            if(invoiceheader.InvoiceId == invoicedetail.InvoiceId){

                              allAreas.forEach(function (a) {
                                if(invoicedetail.AreaId == a.AreaId)
                                  invoicedetail['AreaRoom'] = a.AreaRoom;
                              });
                              subcategories.forEach(function (s) {
                                if(invoicedetail.SubCategoryId == s.SubCategoryId &&
                                      invoicedetail.CategoryId == s.CategoryId)
                                  invoicedetail['SubCategoryName'] = s.SubCategoryName;
                              });

                                invoicedetail["CategoryName"]= 'o';
                                invoice.InvoiceDetails.push(invoicedetail);
                            }
                        });
                        allInvoiceHeaders.push(invoice);
                      }
                  });
              });

              allInfo.push(allProjectCategories);
              allInfo.push(allProjectSubCategories);
              allInfo.push(finalquoteheaderarr);
              allInfo.push(allAreas);
              allInfo.push(allInvoiceHeaders);
              return allInfo;
          });
    }

    return {
      getProject: _getProject,
      addProject: _addProject,
      editProject: _editProject,
      deleteProject: _deleteProject,
      getAllProjects: _getAllProjects,
      getProjectInfo: _getProjectInfo
    };
  };

  var module = angular.module("diycm");
  module.factory("ProjectsService", ['$http', '$q', ProjectsService]);
}());
