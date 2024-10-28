sap.ui.define([
    "sap/ui/core/mvc/Controller",
    'sap/ui/model/type/String',
    'sap/ui/model/Filter',
    'sap/ui/model/FilterOperator',
    "sap/ui/core/library",
    "sap/ui/core/Fragment",
    "sap/ui/core/format/DateFormat",
    "sap/ui/model/json/JSONModel",
    "sap/ui/unified/library",
    "sap/m/library",
    "sap/m/MessageToast",
    "sap/ui/unified/DateRange",
    'sap/m/Token',
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, TypeString, Filter, FilterOperator, coreLibrary, Fragment, DateFormat, JSONModel, unifiedLibrary, mobileLibrary, MessageToast, DateRange, Token) {
        "use strict";
        var CalendarDayType = unifiedLibrary.CalendarDayType;
        var ValueState = coreLibrary.ValueState;
        var SinglePlanningCalendarSelectionMode = mobileLibrary.SinglePlanningCalendarSelectionMode;
        return Controller.extend("com.snet.wbs.zwbsinstcal.controller.View1", {
            onInit: function () {
                // Single Condition
                this._iEvent = 0;
                this._SoldToIdMultiInput = this.byId("SoldToId");
                this._functionalLocationidMultiInput = this.byId("functionalLocationid");
                this._projectId1MultiInput = this.byId("projectId1");

                this._plannerGroupIDMultiInput = this.byId("plannerGroupID");
                this.oFilterBar = this.getView().byId("filterbar");

                // -------- Array for the storing Input Value ------------

                this.oFilter = {};


                //------------End Of Array ------------------------------



                // var oModel = new JSONModel();
                // oModel.setData({
                //     startDate: UI5Date.getInstance("2018", "6", "9"),
                //     appointments: [
                //         {
                //             title: "Discussion of the plan",
                //             type: CalendarDayType.Type01,
                //             startDate: UI5Date.getInstance(),
                //             endDate: UI5Date.getInstance()
                //         },
                //         {
                //             title: "Meet John Miller",
                //             type: CalendarDayType.Type05,
                //             startDate: UI5Date.getInstance("2018", "6", "8", "5", "0"),
                //             endDate: UI5Date.getInstance("2018", "6", "8", "6", "0")
                //         }, {
                //             title: "Lunch",
                //             text: "canteen",
                //             type: CalendarDayType.Type05,
                //             startDate: UI5Date.getInstance("2018", "6", "8", "7", "0"),
                //             endDate: UI5Date.getInstance("2018", "6", "8", "8", "0")
                //         }, {
                //             title: "S.10015PALO.00036.01.1",
                //             text: "room 105",
                //             type: CalendarDayType.Type01,
                //             icon: "sap-icon://meeting-room",
                //             startDate: UI5Date.getInstance("2018", "6", "9", "9", "15"),
                //             endDate: UI5Date.getInstance("2018", "6", "9", "9", "30")
                //         }, {
                //             title: "S.10015PALO.00036.01.1",
                //             text: "room 105",
                //             type: CalendarDayType.Type08,
                //             icon: "sap-icon://meeting-room",
                //             startDate: UI5Date.getInstance("2018", "6", "9", "9", "15"),
                //             endDate: UI5Date.getInstance("2018", "6", "9", "9", "30")
                //         }, {
                //             title: "S.10015PALO.00036.01.2",
                //             text: "room 105",
                //             type: CalendarDayType.Type03,
                //             icon: "sap-icon://meeting-room",
                //             startDate: UI5Date.getInstance("2018", "6", "9", "11", "0"),
                //             endDate: UI5Date.getInstance("2018", "6", "9", "12", "0")
                //         }, {
                //             title: "S.10015PALO.00036.01.3",
                //             type: CalendarDayType.Type01,
                //             text: "room 105",
                //             icon: "sap-icon://meeting-room",
                //             startDate: UI5Date.getInstance("2018", "6", "9", "9", "30"),
                //             endDate: UI5Date.getInstance("2018", "6", "9", "9", "45")
                //         }, {
                //             title: "Private meeting",
                //             type: CalendarDayType.Type03,
                //             startDate: UI5Date.getInstance("2018", "6", "6", "11", "30"),
                //             endDate: UI5Date.getInstance("2018", "6", "6", "12", "0")
                //         }, {
                //             title: "Lunch",
                //             type: CalendarDayType.Type05,
                //             startDate: UI5Date.getInstance("2018", "6", "6", "12", "0"),
                //             endDate: UI5Date.getInstance("2018", "6", "6", "13", "0")
                //         }, {
                //             title: "Discussion of the plan",
                //             type: CalendarDayType.Type01,
                //             startDate: UI5Date.getInstance("2018", "6", "16", "11", "0"),
                //             endDate: UI5Date.getInstance("2018", "6", "16", "12", "0")
                //         }, {
                //             title: "Lunch",
                //             text: "canteen",
                //             type: CalendarDayType.Type05,
                //             startDate: UI5Date.getInstance("2018", "6", "16", "12", "0"),
                //             endDate: UI5Date.getInstance("2018", "6", "16", "13", "0")
                //         }
                //     ]
                // });

                // this.getView().setModel(oModel);

                // oModel = new JSONModel();
                // oModel.setData({ allDay: false });
                // this.getView().setModel(oModel, "allDay");


            },

            formatDate1: function (oValue) {

                if (oValue) {
                    var obj = oValue.split('/')
                    return obj[2] + obj[0] + obj[1]
                }


            },
            // ---------------------------ETA Date Range -----------------------------------------------------------------------


            handleChange: function (oEvent) {

                this.oFilter.sFrom = oEvent.getParameter("from");
                this.oFilter.sTo = oEvent.getParameter("to");
                var bValid = oEvent.getParameter("valid"),
                    oEventSource = oEvent.getSource();
                //     oText = this.byId("etarangedateID");

                this._iEvent++;

                var dateFormat = sap.ui.core.format.DateFormat.getDateInstance({
                    //   pattern: "yyyyMMdd"
                    pattern: "MM/dd/yyyy"
                });

                this.oFilter.sFrom = dateFormat.format(this.oFilter.sFrom);
                this.oFilter.sTo = dateFormat.format(this.oFilter.sTo);
                this.oFilter.sFrom = this.formatDate1(this.oFilter.sFrom);
                this.oFilter.sTo = this.formatDate1(this.oFilter.sTo);
                //   //  oText.setValue("Id: " + oEventSource.getId() + "\nFrom: " + this.oFilter.sFrom+ "\nTo: " + this.oFilter.sTo);

                //     if (bValid) {
                //       //  oEventSource.setValueState(ValueState.None);
                //     } else {
                //       //  oEventSource.setValueState(ValueState.Error);
                //     }
            },


            //-------------------------End of ETA Date Range ------------------------------------------------------------
            // -------------------------------------Start of Sold To Functionality --------------------------------------------------
            onsoldToVHRequested: function () {

                this._SoldToDialog = sap.ui.xmlfragment("com.snet.wbs.zwbsinstcal.fragment.SoldToVH", this);
                this.getView().addDependent(this._SoldToDialog);
                this._SoldToDialog.setRangeKeyFields([{
                    label: "Sold To Party",
                    key: "SoldToParty",
                
                    typeInstance: new TypeString({}, {
                        maxLength: 30
                    })
                }]);

                this._SoldToDialog.setIncludeRangeOperations([
                    
                    FilterOperator.Contains,
                    FilterOperator.EQ,
                    FilterOperator.StartsWith,
                    FilterOperator.EndsWith,
                   
                ]);
                this._SoldToDialog.setTokens(this._SoldToIdMultiInput.getTokens());
                this._SoldToDialog.open();

                // this.loadFragment({
                //     name: "com.snet.wbs.zwbsinstcal.fragment.SoldToVH"
                // }).then(function (oSingleConditionDialog) {
                //     this._SoldToDialog = oSingleConditionDialog;
                //     oSingleConditionDialog.setRangeKeyFields([{
                //         label: "Product",
                //         key: "ProductId",
                //         type: "string",
                //         typeInstance: new TypeString({}, {
                //             maxLength: 7
                //         })
                //     }]);

                //     oSingleConditionDialog.setTokens(this._SoldToIdMultiInput.getTokens());
                //     oSingleConditionDialog.open();
                // }.bind(this));
            },

            onSoldToVHOkPress: function (oEvent) {
                var aTokens = oEvent.getParameter("tokens");

                if(aTokens.length !== 0)
             {
                this.oFilter.soldToVal1 = aTokens[0].mAggregations.customData[0].mProperties.value.value1;
                this.oFilter.soldToVal2 = aTokens[0].mAggregations.customData[0].mProperties.value.value2;
             }
                this._SoldToIdMultiInput.setTokens(aTokens);
                this._SoldToDialog.close();
            },
            onSoldToCancelPress: function (oEvent) {
                this._SoldToDialog.close();
            },
            onSoldToAfterClose: function (oEvent) {
                this._SoldToDialog.destroy();
            },


            // --------------------------------------------End of Sold to Functionality------------------------------------------------------




            // ----------------Start of Funtional Location Valu Help Functionality-----------------------
            onFunctionaLocationVHRequested: function () {

                this._FunctionalLocationIdDialog = sap.ui.xmlfragment("com.snet.wbs.zwbsinstcal.fragment.funtionalLocationVH", this);
                this.getView().addDependent(this._FunctionalLocationIdDialog);
                this._FunctionalLocationIdDialog.setRangeKeyFields([{
                    label: "Functional Location",
                    key: "FunctionalLocation",
                   
                    typeInstance: new TypeString({}, {
                        maxLength: 30
                    })
                }]);
                
                this._FunctionalLocationIdDialog.setIncludeRangeOperations([
                    
                    FilterOperator.Contains,
                    FilterOperator.EQ,
                    FilterOperator.StartsWith,
                    FilterOperator.EndsWith,
                   
                ]);
                this._FunctionalLocationIdDialog.setTokens(this._functionalLocationidMultiInput.getTokens());
                this._FunctionalLocationIdDialog.open();



                // this.loadFragment({
                //     name: "com.snet.wbs.zwbsinstcal.fragment.funtionalLocationVH"
                // }).then(function (oSingleConditionDialog) {
                //     this._FunctionalLocationIdDialog = oSingleConditionDialog;
                //     oSingleConditionDialog.setRangeKeyFields([{
                //         label: "Product",
                //         key: "ProductId",
                //         type: "string",
                //         typeInstance: new TypeString({}, {
                //             maxLength: 30
                //         })
                //     }]);

                //     oSingleConditionDialog.setTokens(this._functionalLocationidMultiInput.getTokens());
                //     oSingleConditionDialog.open();
                // }.bind(this));
            },

            onFunctionLocationVHOkPress: function (oEvent) {
                var aTokens = oEvent.getParameter("tokens");
                if(aTokens.length !== 0)
            {
                this.oFilter.FunLocVal1 = aTokens[0].mAggregations.customData[0].mProperties.value.value1;
                this.oFilter.FunLocVal2 = aTokens[0].mAggregations.customData[0].mProperties.value.value2;
            }
                this._functionalLocationidMultiInput.setTokens(aTokens);
                this._FunctionalLocationIdDialog.close();
            },
            onFunctionalLocationVHCancelPress: function (oEvent) {
                this._FunctionalLocationIdDialog.close();
            },
            onFunctionalLocationVHAfterClose: function (oEvent) {
                this._FunctionalLocationIdDialog.destroy();
            },

            //--------------------------End of Functional Location Functionality--------------------------------------------------------------------

            onSearch: function (oEvent) {

           
                var oFilterBar = oEvent.getSource();
                var aFilterItems = oFilterBar.getFilterGroupItems();
              
                var oFilter = [];

                if(this.getView().byId("DRS1").getValue() === "")
                    {
                        MessageToast.show("Please enter the ETA Date range !!");
                        return;
                    }
                    else{
                        var aFilters = aFilterItems.map(function (oFilterItem) {
                            var sFilterName = oFilterItem.getName();
                            var oControl = oFilterBar.determineControlByFilterItem(oFilterItem);
                            var sValue;
        
                            // if (oControl.getMetadata().getName() === "sap.m.MultiInput" && oFilterItem.mProperties.label === 'Order Number') {
        
                            //     var aTokens = oControl.getTokens();
                            //     var aFilters = aTokens.map(function (oToken) {
                            //         if (oToken.data("range")) {
                            //             var oRange = oToken.data("range");
                            //             oFilter.push(new Filter({
                            //                 path: "OrderNumber",
                            //                 operator: oRange.operation,
                            //                 value1: oRange.value1,
                            //                 value2: oRange.value2
                            //             }));
                            //         }
        
                            //     });
        
        
                            //     // sValue = oControl.getValue();
                            //     // oFilter.push(new sap.ui.model.Filter("OrderNumber", sap.ui.model.FilterOperator.EQ, sValue));
                            // }
                             if (oControl.getMetadata().getName() === "sap.m.DateRangeSelection") {
        
                                // sValue = "20240110";
                                if (oControl.mProperties.value) {
                                    oFilter.push(new sap.ui.model.Filter({
                                        filters: [
                                            new sap.ui.model.Filter("EtaDate", sap.ui.model.FilterOperator.GE, this.oFilter.sFrom),
                                            new sap.ui.model.Filter("EtaDate", sap.ui.model.FilterOperator.LE, this.oFilter.sTo)
                                        ],
                                        and: true
                                        // oFilter.push(new sap.ui.model.Filter("CreationDate", sap.ui.model.FilterOperator.GE, this.oFilter.sFrom ));
                                        // oFilter.push(new sap.ui.model.Filter("CreationDate", sap.ui.model.FilterOperator.LE, this.oFilter.sTo));
                                    }));
                                }
                            }
                            else if (oControl.getMetadata().getName() === "sap.m.MultiInput" && oFilterItem.mProperties.label === 'Sold To') {
                                if (oControl.getTokens()) {
                                    //  sValue = oControl.mProperties._semanticFormValue;
                                    //  oFilter.push(new sap.ui.model.Filter("OrderType", sap.ui.model.FilterOperator.Contains, sValue));
                                    var aTokens = oControl.getTokens();
                                    var aFilters = aTokens.map(function (oToken) {
                                        // if (oToken.mProperties.text !== '') {
        
                                        //     oFilter.push(new Filter({
                                        //         path: "SoldToParty",
                                        //         operator: 'EQ',
                                        //         value1: oToken.mProperties.text
        
                                        //     }));
                                        // }
        
                                        if (oToken.data("range")) {
                                            var oRange = oToken.data("range");
                                           if(oRange.exclude === true && oRange.operation === "EQ")
                                           {
                                            oFilter.push(new Filter({
                                                path: "SoldToParty",
                                                operator: "NE",
                                                value1: oRange.value1,
                                                value2: oRange.value2
                                            }));
                                           }
                                           else{
                                            oFilter.push(new Filter({
                                                path: "SoldToParty",
                                                operator: FilterOperator.Contains,
                                                value1: oRange.value1,
                                                value2: oRange.value2
                                            }));
                                           }
                                          
                                        }
        
                                    });
                                }
        
                            }
                            else if (oControl.getMetadata().getName() === "sap.m.MultiInput" && oFilterItem.mProperties.label === 'Functional Location') {
                                if (oControl.getTokens()) {
                                    // sValue = oControl.mProperties._semanticFormValue;
                                    // oFilter.push(new sap.ui.model.Filter("SalesOrg", sap.ui.model.FilterOperator.EQ, sValue));
                                    var aTokens = oControl.getTokens();
                                    var aFilters = aTokens.map(function (oToken) {
                                        // if (oToken.mProperties.text !== '') {
        
                                        //     oFilter.push(new Filter({
                                        //         path: "FunctionalLocation",
                                        //         operator: 'EQ',
                                        //         value1: oToken.mProperties.text
        
                                        //     }));
                                        // }

                                        if (oToken.data("range")) {
                                            var oRange = oToken.data("range");


                                            if(oRange.exclude === true && oRange.operation === "EQ")
                                                {
                                                    oFilter.push(new Filter({
                                                        path: "FunctionalLocation",
                                                        operator: "NE",
                                                        value1: oRange.value1,
                                                        value2: oRange.value2
                                                    }));
                                                }
                                                else{
                                                    oFilter.push(new Filter({
                                                        path: "FunctionalLocation",
                                                        operator: FilterOperator.Contains,
                                                        value1: oRange.value1,
                                                        value2: oRange.value2
                                                    }));
                                                }

                                        }
        
                                    });
                                }
                            }
                            else if (oControl.getMetadata().getName() === "sap.m.MultiInput" && oFilterItem.mProperties.label === 'Project ID') {
                                if (oControl.getTokens()) {
                                    // sValue = oControl.mProperties._semanticFormValue;
                                    // oFilter.push(new sap.ui.model.Filter("SalesOrg", sap.ui.model.FilterOperator.EQ, sValue));
                                    var aTokens = oControl.getTokens();
                                    var aFilters = aTokens.map(function (oToken) {
                                        // if (oToken.mProperties.text !== '') {
        
                                        //     oFilter.push(new Filter({
                                        //         path: "Project",
                                        //         operator: 'EQ',
                                        //         value1: oToken.mProperties.text
        
                                        //     }));
                                        // }
                                        if (oToken.data("range")) {
                                            var oRange = oToken.data("range");

                                            if(oRange.exclude === true && oRange.operation === "EQ")
                                                {
                                                    oFilter.push(new Filter({
                                                        path: "Project",
                                                        operator:"NE",
                                                        value1: oRange.value1,
                                                        value2: oRange.value2
                                                    }));
                                                }
                                                else{
                                                    oFilter.push(new Filter({
                                                        path: "Project",
                                                        operator: FilterOperator.Contains,
                                                        value1: oRange.value1,
                                                        value2: oRange.value2
                                                    }));
                                                }
    
                                        }
        
                                    });
                                }
                            }
                            else if (oControl.getMetadata().getName() === "sap.m.MultiInput" && oFilterItem.mProperties.label === 'Planner Group') {
                                if (oControl.getTokens()) {
                                    // sValue = oControl.mProperties._semanticFormValue;
                                    // oFilter.push(new sap.ui.model.Filter("SalesOrg", sap.ui.model.FilterOperator.EQ, sValue));
                                    var aTokens = oControl.getTokens();
                                    var aFilters = aTokens.map(function (oToken) {
                                        // if (oToken.mProperties.text !== '') {
        
                                        //     oFilter.push(new Filter({
                                        //         path: "PlannerGroup",
                                        //         operator: 'EQ',
                                        //         value1: oToken.mProperties.text
        
                                        //     }));
                                        // }
                                        if (oToken.data("range")) {
                                            var oRange = oToken.data("range");


                                            if(oRange.exclude === true && oRange.operation === "EQ")
                                                {
                                                    oFilter.push(new Filter({
                                                        path: "PlannerGroup",
                                                        operator: "NE",
                                                        value1: oRange.value1,
                                                        value2: oRange.value2
                                                    }));
                                                }
                                                else{
                                                    oFilter.push(new Filter({
                                                        path: "PlannerGroup",
                                                        operator: FilterOperator.Contains,
                                                        value1: oRange.value1,
                                                        value2: oRange.value2
                                                    }));
                                                }


                                      
                                        }
        
                                    });
                                }
                            }
                            else if (oControl.getMetadata().getName() === "sap.m.CheckBox" && oFilterItem.mProperties.label === 'WM Install Only') {
                                if (oControl.getSelected()) {
                                    // sValue = oControl.mProperties._semanticFormValue;
                                    // oFilter.push(new sap.ui.model.Filter("SalesOrg", sap.ui.model.FilterOperator.EQ, sValue));
                                    var aTokens = oControl.getSelected();
                                
                                    if (aTokens !== false) {
        
                                            oFilter.push(new Filter({
                                                path: "WmInstall",
                                                operator: 'EQ',
                                                value1: aTokens
        
                                            }));
                                        }
        
                                
                                }
                            }
                            else if (oControl.getMetadata().getName() === "sap.m.CheckBox" && oFilterItem.mProperties.label === 'Self-Install Only') {
                                if (oControl.getSelected()) {
                                    // sValue = oControl.mProperties._semanticFormValue;
                                    // oFilter.push(new sap.ui.model.Filter("SalesOrg", sap.ui.model.FilterOperator.EQ, sValue));
                                    var aTokens = oControl.getSelected();
          
                                        if (aTokens !== false) {
        
                                            oFilter.push(new Filter({
                                                path: "SelfInstall",
                                                operator: 'EQ',
                                                value1: aTokens
        
                                            }));
                                        }
        
                       
                                }
                            }
        
        
                            //  new sap.ui.model.Filter(sFilterName, "EQ", sValue);
                            return oFilter;
                        }, this);
        
                        var oModel = this.getView().getModel();
                        sap.ui.core.BusyIndicator.show(0);
        
                        //  oModel.read("/RETURN_ORDERSet(SerialNumber='" + scanner[0] + "')", {
                        oModel.read("/WBS_InstallSet", {
                            filters: oFilter,
                            success: function (oData, oResponse) {
                             
                                this.instaCalendarModel = new JSONModel();
                                var obj = oResponse.data.results;
                                var i = 0;

                                if(obj)
                                    {
                                       obj.StartDate1 =  this.onExtractDateYYYYMMDD(obj[0].ActivityStartDate, obj[0].ActivityStartTime.ms);
                                    }
        
                                for(i=0 ; i< obj.length; i++)
                                 {
                                    obj[i].ActivityStartDate = this.onExtractDateYYYYMMDD(obj[i].ActivityStartDate, obj[i].ActivityStartTime.ms);
                                    obj[i].ActivityEndDate  = this.onExtractDateYYYYMMDD(obj[i].ActivityEndDate, obj[i].ActivityEndTime.ms);
                                 }
        
                                 this.getView().byId("SPC1").getModel().refresh(true);
                                 if(this.getView().getModel("instaCalendarModel") === undefined)
                                 {

                                 }
                                 else{
                                    this.getView().getModel("instaCalendarModel").setData(null);
                                 }
                                
                                this.instaCalendarModel.setData(obj);
                           
                                this.getView().setModel(this.instaCalendarModel, "instaCalendarModel");
                                this.getView().getModel("instaCalendarModel").updateBindings(true);
                                sap.ui.core.BusyIndicator.hide();
                            }.bind(this),
                            error: function (oError) {
                                sap.ui.core.BusyIndicator.hide();
                                  this.instaCalendarModel = new JSONModel();
                           //     this.returnOrderModel = new JSONModel();
                             //   this.instaCalendarModel.setData(null);
                                this.getView().getModel("instaCalendarModel").setData(null);
                                MessageToast.show(JSON.parse(oError.responseText).error.message.value);
                            }.bind(this),
                        });
                    }


             
            },


            onExtractDateYYYYMMDD : function(oDate , edmTimeInMs)
            {
            
                var dateString = oDate; // Example date: 19th August 2024

                    // Extract year, month, and day
                    var year = dateString.substring(0, 4); // YYYY
                    var month = dateString.substring(4, 6); // MM
                    var day = dateString.substring(6, 8); // DD

                        // Convert to a Date object
                    var dateObject = new Date(year, month - 1, day); // JavaScript months are 0-based

                    // Format the date as needed
                    var formattedDate = {
                        year: dateObject.getFullYear(),
                        month: dateObject.getMonth(), // Months are 0-based so add 1
                        day: dateObject.getDate()
                    };

                    var totalMinutes = Math.floor(edmTimeInMs / 60000); // 1 minute = 60000 milliseconds

                    // Calculate hours and minutes
                    var hours = Math.floor(totalMinutes / 60); // Full hours
                    var minutes = totalMinutes % 60; // Remaining minutes
                
                    // Format hours and minutes with leading zeros
                    var formattedHours = hours < 10 ? '0' + hours : hours;
                    var formattedMinutes = minutes < 10 ? '0' + minutes : minutes;

               //  return   UI5Date.getInstance( formattedDate.year, formattedDate.month,formattedDate.day, formattedHours, formattedMinutes);
                          return new Date(formattedDate.year, formattedDate.month,formattedDate.day, formattedHours, formattedMinutes);

                

                    // console.log("Year:", formattedDate.year);
                    // console.log("Month:", formattedDate.month);
                    // console.log("Day:", formattedDate.day);

            },



            // ------------------------Start of Project Id Value Help Funtionality--------------------------------------------------------------------
            onProjectIdVHRequested: function () {


                this._ProjectIDDialog = sap.ui.xmlfragment("com.snet.wbs.zwbsinstcal.fragment.projectIdVH", this);
                this.getView().addDependent(this._ProjectIDDialog);
                this._ProjectIDDialog.setRangeKeyFields([{
                    label: "Project ID",
                    key: "Project",
                 
                    typeInstance: new TypeString({}, {
                        maxLength: 30
                    })
                }]);
                this._ProjectIDDialog.setIncludeRangeOperations([
                    
                    FilterOperator.Contains,
                    FilterOperator.EQ,
                    FilterOperator.StartsWith,
                    FilterOperator.EndsWith,
                   
                ]);
                this._ProjectIDDialog.setTokens(this._projectId1MultiInput.getTokens());
                this._ProjectIDDialog.open();

                // this.loadFragment({
                //     name: "com.snet.wbs.zwbsinstcal.fragment.projectIdVH"
                // }).then(function (oSingleConditionDialog) {
                //     this._ProjectIDDialog = oSingleConditionDialog;
                //     oSingleConditionDialog.setRangeKeyFields([{
                //         label: "Product",
                //         key: "ProductId",
                //         type: "string",
                //         typeInstance: new TypeString({}, {
                //             maxLength: 20
                //         })
                //     }]);

                //     oSingleConditionDialog.setTokens(this._projectId1MultiInput.getTokens());
                //     oSingleConditionDialog.open();
                // }.bind(this));
            },


            onSProjectIdVHOkPress: function (oEvent) {
                var aTokens = oEvent.getParameter("tokens");

                if(aTokens.length !== 0){
                this.oFilter.ProjIDVal1 = aTokens[0].mAggregations.customData[0].mProperties.value.value1;
                this.oFilter.ProjIDVal2 = aTokens[0].mAggregations.customData[0].mProperties.value.value2;
                }
                this._projectId1MultiInput.setTokens(aTokens);
                this._ProjectIDDialog.close();
            },
            onProjectIdVHCancelPress: function (oEvent) {
                this._ProjectIDDialog.close();
            },
            onProjectIdVHAfterClose: function (oEvent) {
                this._ProjectIDDialog.destroy();
            },


            //-------------------------- End of Project Id Functionality------------------------------------------------------------------------------



            //---------------------------Start of Planner Group value help Functionality ------------------------------------------------------------
            onPlannerGroupVHRequested: function () {

                this._plannerGroupDailog = sap.ui.xmlfragment("com.snet.wbs.zwbsinstcal.fragment.plannerGroupVH", this);
                this.getView().addDependent(this._plannerGroupDailog);
                this._plannerGroupDailog.setRangeKeyFields([{
                    label: "Planner Group",
                    key: "PlannerGroup",
                   
                    typeInstance: new TypeString({}, {
                        maxLength: 30
                    })
                }]);
                this._plannerGroupDailog.setIncludeRangeOperations([
                    
                    FilterOperator.Contains,
                    FilterOperator.EQ,
                    FilterOperator.StartsWith,
                    FilterOperator.EndsWith,
                   
                ]);
                this._plannerGroupDailog.setTokens(this._plannerGroupIDMultiInput.getTokens());
                this._plannerGroupDailog.open();

                // this.loadFragment({
                //     name: "com.snet.wbs.zwbsinstcal.fragment.plannerGroupVH"
                // }).then(function (oSingleConditionDialog) {
                //     this._plannerGroupDailog = oSingleConditionDialog;
                //     oSingleConditionDialog.setRangeKeyFields([{
                //         label: "Product",
                //         key: "ProductId",
                //         type: "string",
                //         typeInstance: new TypeString({}, {
                //             maxLength: 7
                //         })
                //     }]);

                //     oSingleConditionDialog.setTokens(this._plannerGroupIDMultiInput.getTokens());
                //     oSingleConditionDialog.open();
                // }.bind(this));
            },
            onPlannerGroupVHOkPress: function (oEvent) {
                var aTokens = oEvent.getParameter("tokens");
                //  aTokens[0].mAggregations.customData[0].mProperties.value
                if(aTokens.length !== 0)
            {
                this.oFilter.PlannerGroupVal1 = aTokens[0].mAggregations.customData[0].mProperties.value.value1;
                this.oFilter.PlannerGroupVal2 = aTokens[0].mAggregations.customData[0].mProperties.value.value2;
            }
                this._plannerGroupIDMultiInput.setTokens(aTokens);
                this._plannerGroupDailog.close();
            },
            onPlannerGroupVHCancelPress: function () {
                this._plannerGroupDailog.close();
            },
            onSoldToAfterClose: function () {
                this._plannerGroupDailog.destroy();
            },

            //----------------------------End of Planner Group Value Help Functionality ------------------------------------------------------------


            zoomIn: function () {
                var oSPC = this.getView().byId("SPC1");
                var iCurrentScaleFoucs = oSPC.getScaleFactor();
                oSPC.setScaleFactor(++iCurrentScaleFoucs);
            },

            zoomOut: function () {
                var oSPC = this.getView().byId("SPC1");
                var iCurrentScaleFoucs = oSPC.getScaleFactor();
                oSPC.setScaleFactor(--iCurrentScaleFoucs);
            },

            handleAppointmentSelect: function (oEvent) {
                var oAppointment = oEvent.getParameter("appointment"),
                    oStartDate,
                    oEndDate,
                    oTrimmedStartDate,
                    oTrimmedEndDate,
                    bAllDate,
                    oModel,
                    oView = this.getView();

                if ((!oAppointment || !oAppointment.getSelected()) && this._pDetailsPopover) {
                    this._pDetailsPopover.then(function (oResponsivePopover) {
                        oResponsivePopover.close();
                    });
                    return;
                }

                if(oAppointment !== undefined)
                {
                    oStartDate = oAppointment.getStartDate();
                    oEndDate = oAppointment.getEndDate();
                    // oTrimmedStartDate = UI5Date.getInstance(oStartDate);
                    // oTrimmedEndDate = UI5Date.getInstance(oEndDate);

                    oTrimmedStartDate =new Date(oStartDate);
                    oTrimmedEndDate = new Date(oEndDate);
                    bAllDate = false;
                    oModel = this.getView().getModel("instaCalendarModel");
    
                    this._setHoursToZero(oTrimmedStartDate);
                    this._setHoursToZero(oTrimmedEndDate);
    
                    if (oStartDate.getTime() === oTrimmedStartDate.getTime() && oEndDate.getTime() === oTrimmedEndDate.getTime()) {
                        bAllDate = true;
                    }
    
                    oModel.getData().allDay = bAllDate;
                    oModel.updateBindings();
    
                    if (!this._pDetailsPopover) {
                        this._pDetailsPopover = Fragment.load({
                            id: oView.getId(),
                            name: "com.snet.wbs.zwbsinstcal.fragment.updateNotes",
                            controller: this
                        }).then(function (oDetailsPopover) {
                            oView.addDependent(oDetailsPopover);
                            return oDetailsPopover;
                        });
                    }
                    this._pDetailsPopover.then(function (oDetailsPopover) {
                      //  oDetailsPopover.setBindingContext(oAppointment.getBindingContext());
                        
                        oDetailsPopover.setBindingContext(oAppointment.getBindingContext("instaCalendarModel"));
                        oDetailsPopover.openBy(oAppointment);
                    });
                }
              
            },

            _setHoursToZero: function (oDate) {
                oDate.setHours(0, 0, 0, 0);
            },

            handleEditButton: function () {
                // The sap.m.Popover has to be closed before the sap.m.Dialog gets opened
                var oDetailsPopover = this.byId("detailsPopover");
                oDetailsPopover.close();
             //   this.sPath = oDetailsPopover.getBindingContext("undefined").getPath();
                this.sPath = oDetailsPopover.oBindingContexts.undefined.getPath()
                this._arrangeDialogFragment("WBS Notes");
            },

            _arrangeDialogFragment: function (sTitle) {
                var oView = this.getView();

                if (!this._pNewAppointmentDialog) {
                    this._pNewAppointmentDialog = Fragment.load({
                        id: oView.getId(),
                        name: "com.snet.wbs.zwbsinstcal.fragment.ModifyNotes",
                        controller: this
                    }).then(function (oModifyDialog) {
                        oView.addDependent(oModifyDialog);
                        return oModifyDialog;
                    });
                }

                this._pNewAppointmentDialog.then(function (oModifyDialog) {
                    this._arrangeDialog(sTitle, oModifyDialog);




                }.bind(this));
            },


            _arrangeDialog: function (sTitle, oModifyDialog) {
                this._setValuesToDialogContent();
                var oWBSObj = this.byId("detailsPopover").oBindingContexts.undefined.getObject().Wbs;
                if(oWBSObj)
                    {
                        var oModel = this.getView().getModel();
                        var oFilter = [];
                        oFilter.push(new Filter({
                            path: "Wbs",
                            operator: 'EQ',
                            value1: oWBSObj
        
                        }));
                        sap.ui.core.BusyIndicator.show(0);



                        // Start of Fetching value Help data for WBS Notes.....................

                        oModel.read("/WBSTextSet", {
                            method: "GET",
                        // oModel.read("/WBS_NotesSet", {
                        //     filters: oFilter,
                            success: function (oData, oResponse) {
                          
                                this.wbstextModel = new JSONModel();
                                var obj = oResponse.data.results;
                             
                                this.wbstextModel.setData(obj);
        
                                this.getView().setModel(this.wbstextModel, "wbstextModel");
                                sap.ui.core.BusyIndicator.hide();
                            }.bind(this),
                            error: function (oError) {
                            
                                sap.ui.core.BusyIndicator.hide();
                                this.wbstextModel = new JSONModel();
                                this.wbstextModel.setData({});
                                MessageToast.show(JSON.parse(oError.responseText).error.message.value);
                            }.bind(this),
                        });

                        //------------End of Value Help data ------------

                        // ------------Start of Fetching WBS element Details-------
        
                          oModel.read("/WBS_NotesSet('" + oWBSObj + "')", {
                            method: "GET",
                        // oModel.read("/WBS_NotesSet", {
                        //     filters: oFilter,
                            success: function (oData, oResponse) {
                              
                                this.resultSet = new JSONModel();
                                var obj = oResponse.data;
                                this.oMultiInput1   = this.getView().byId("idWBSElementText");
                                this.oMultiInput1.removeAllTokens();
                                if(obj.WbsText)
                                {

                                   
                                    this.oMultiInput1.addToken(new sap.m.Token({
                                        text: obj.WbsText
                
                                    }));
                                }
                             
                                this.resultSet.setData(obj);
        
                                this.getView().setModel(this.resultSet, "resultSet");
                             //   this.byId("idWBSDesc").setValue(obj.WbsText);
                                sap.ui.core.BusyIndicator.hide();
                            }.bind(this),
                            error: function (oError) {
                                sap.ui.core.BusyIndicator.hide();
                                this.resultSet = new JSONModel();
                                this.resultSet.setData({});
                                MessageToast.show(JSON.parse(oError.responseText).error.message.value);
                            }.bind(this),
                        });
                        // ---------------End of Fetching WBS element Details--------------
                    }

                oModifyDialog.setTitle(sTitle);
                oModifyDialog.open();
            },




            _setValuesToDialogContent: function () {
                var oTitleControl = this.byId("appTitle"),
                    oContext,
                    oContextObject,
                    sTitle;



                if (this.sPath) {
                   // oContext = this.byId("detailsPopover").getBindingContext();
                   oContext =  this.byId("detailsPopover").oBindingContexts.undefined;
                    oContextObject = oContext.getObject();
                    sTitle = oContextObject.Wbs;

                } else {
                    sTitle = "";
                    sText = "";

                }

               // oTitleControl.setValue(sTitle);

            },


            onPressWBSDescVH :function(oEvent)
            {

                var sInputValue = oEvent.getSource().getValue(),
                oView = this.getView();
            this.oMultiInput1 = oEvent.getSource().getId();
            // create value help dialog
            if (!this._pValueHelpDialog) {
                this._pValueHelpDialog = Fragment.load({
                    id: oView.getId(),
                    name: "com.snet.wbs.zwbsinstcal.fragment.WBSNotesVH",
                    controller: this
                }).then(function (oValueHelpDialog) {
                    oView.addDependent(oValueHelpDialog);
                    return oValueHelpDialog;
                });
            }

            this._pValueHelpDialog.then(function (oValueHelpDialog) {
                // create a filter for the binding
                oValueHelpDialog.getBinding("items").filter([new Filter(
                    "Id",
                    FilterOperator.Contains,
                    sInputValue
                )]);
                // open value help dialog filtered by the input value
                oValueHelpDialog.open(sInputValue);
            });

            },


            
            _handleValueHelConfirm: function (evt) {
             

                var oInput = this.byId("idWBSElementText"); 

                var oMultiInput = this.byId("idWBSElementText");

                // Clear all tokens
                oMultiInput.removeAllTokens();



                //
                //    var aSelectedItems = evt.getParameter("selectedItems");
                var aSelectedItems = evt.getParameters("tokens").selectedContexts;
                var alength = aSelectedItems.length;
                //  oMultiInput1 = this.byId("idOrderTypeVH");
                // this.oMultiInput1 = evt.getSource().getId();

                for (var i = 0; i < alength; i++) {
                    var sPath = parseInt(aSelectedItems[i].sPath.split("/")[1]);
                    for (var j = 0; j < this.wbstextModel.oData.length; j++) {
                        if (sPath === j) {
                            this.byId(this.oMultiInput1).addToken(new Token({
                                text: this.wbstextModel.oData[sPath].TextDesc
                                //  text :aSelectedItems[0].mProperties.title

                            }));
                        }
                    }
                }

             
            },

            _handleValueHelpSearch: function (evt) {
                debugger;
                var sValue = evt.getParameter("value");
                // var oFilter = new Filter(
                //     "TextDesc",
                //     FilterOperator.Contains,
                //     sValue
                // );
                // var oFilter = new Filter(
                //     "Id",
                //     FilterOperator.Contains,
                //     sValue
                // );

                var oFilter =  new sap.ui.model.Filter({
                    filters: [
                    new sap.ui.model.Filter("TextDesc",FilterOperator.Contains, sValue),
                    new sap.ui.model.Filter("Id",FilterOperator.Contains ,sValue)
                    ],
                    and: false
                })
                evt.getSource().getBinding("items").filter([oFilter]);
            },


            onDialogClose: function (evt) {
                var aSelectedItems = evt.getParameter("selectedItems"),
                    oMultiInput1 = this.byId("idWBSElementText");
                    oMultiInput1.close();

                    //Below are the commented code for clearing tokens
                //     oMultiInput1.removeAllTokens();

                // if (aSelectedItems && aSelectedItems.length > 0) {
                //     aSelectedItems.forEach(function (oItem) {
                //         oMultiInput1.addToken(new Token({
                //             text: oItem.getTitle()
                //         }));
                //     });
                // }
            },

            handleMoreLinkPress: function(oEvent) {
              
                var oDate = oEvent.getParameter("date"),
                    oSinglePlanningCalendar = this.getView().byId("SPC1");
    
                oSinglePlanningCalendar.setSelectedView(oSinglePlanningCalendar.getViews()[0]); // DayView
    
              //  this.getView().getModel().setData({ startDate: oDate }, true);
                this.getView().getModel("instaCalendarModel").setProperty('/StartDate1', oDate);
            },


            onSaveNotes: function (oEvent) {
            
            
                var payload = {};

                payload.Wbs = this.byId("appTitle").getValue(),
                payload.WbsNotes = this.byId("idNewTextNotes").getValue();
                // payload.WbsText =this.getView().byId("idWBSElementText").mProperties._semanticFormValue,
                var wbsTextLength = this.getView().byId("idWBSElementText").getTokens().length;
                if(wbsTextLength > 0 )
                {
                    payload.WbsText =   this.getView().byId("idWBSElementText").getTokens()[0].mProperties.text;
                }
                else
                {
                    payload.WbsText = ''
                }

                
               
               

                var oModel1 = this.getView().getModel();


                oModel1.create("/WBS_NotesSet", payload, {
                    method: "POST",             
                    success: function (data, oResponse) {
                       
                        sap.ui.core.BusyIndicator.hide();
                        this.byId("idNewTextNotes").setValue("");
                       
                        MessageToast.show("WBS notes has been successfully updated for "+ oResponse.data.Wbs + "." );
                    }.bind(this),
                    error: function (e) {

                        //MessageToast.show(e.responseText.split(',')[2].split(":")[1] + ' ' + e.responseText.split(',')[2].split(":")[2]);
                        sap.ui.core.BusyIndicator.hide();
                        MessageToast.show(JSON.parse(e.responseText).error.message.value);
                        this.byId("idNewTextNotes").setValue("");
                        this.getView().byId("idButtonUpdate").setEnabled(false);
                    }.bind(this)
                });

                // if (this.byId(sStartDate).getValueState() !== "Error"
                //     && this.byId(sEndDate).getValueState() !== "Error") {

                //     if (this.sPath) {
                //         sAppointmentPath = this.sPath;
                //         oModel.setProperty(sAppointmentPath + "/title", sTitle);
                //         oModel.setProperty(sAppointmentPath + "/text", sText);

                //     } else {
                //         oModel.getData().appointments.push({
                //             title: sTitle,
                //             text: sText,

                //         });
                //     }

                //     oModel.updateBindings();

                //     //this.byId("modifyDialog").close();
                // }
                this.byId("modifyDialog").close();


            },


            handleDialogCancelButton: function () {
                this.sPath = null;
                this.oMultiInput1   = this.getView().byId("idWBSElementText");
                this.oMultiInput1.removeAllTokens();
                this.oMultiInput1.addToken(new sap.m.Token({
                    text: ""

                }));
                this.getView().setModel("resultSet",{});
                this.byId("idNewTextNotes").setValue("");
                this.byId("modifyDialog").close();
            },

            //----------------------------Start of WM Install CheckBox Selected-------------------------------------

            onWMInstallSelcted: function (oEvent) {
          
                this.oFilter.WMInstall = oEvent.getParameter("selected");
            },

            //---------------------------End of WM Install Checkbox Selected -----------------------------------

            //----------------------------Start of Self Install CheckBox Selected-------------------------------------

            onCheckBoxSelfInstall: function (oEvent) {
               
                this.oFilter.SelfInstall = oEvent.getParameter("selected");
            },

            //---------------------------End of Start Install Checkbox Selected -----------------------------------

            // -------------------------Start of Execute -----------------------------------------------------------



            onPressExecute: function (oEvent) {

              

                var oModel = this.getView().getModel();
                var oModelJson = new sap.ui.model.json.JSONModel();
                sap.ui.core.BusyIndicator.show(0);
                //  oModel.read("/DelInfoSet?Network='"+oNetworkId+"'&ActivityId='"+oActivityId+"'", {
                oModel.read("/DelInfoSet(Network='" + oNetworkId + "',ActivityId='" + oActivityId + "')", {
                    success: function (oData, oResponse) {
                        oModelJson.setData(oResponse.data);
                        //    sap.ui.getCore().setModel(oModelJson, "oAddressModel");
                        this.getView().setModel(oModelJson, "oAddressModel")
                       // this.getView().byId("idButtonUpdate").setEnabled(true);
                        sap.ui.core.BusyIndicator.hide();
                    }.bind(this),
                    error: function (e) {
                        sap.ui.core.BusyIndicator.hide();
                        MessageToast.show(JSON.parse(e.responseText).error.message.value);
                        this.getView().getModel("oAddressModel").setData({});
                       // this.getView().byId("idButtonUpdate").setEnabled(false);
                    }.bind(this)
                })


            },

            //--------------------------End Of Execute -------------------------------------------------------------

        

        });
    });
