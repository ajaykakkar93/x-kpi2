define(["qlik", "text!./template.html", './extUtils', "text!./style.css", 'ng!$q'],
    function(qlik, template, extUtils, css, $q) {
        var faUrl = extUtils.getBasePath() + '/extensions/sheet-nav/lib/external/fontawesome/css/font-awesome.min.css';
        extUtils.addStyleLinkToHeader(faUrl, 'sheet-nav__fontawesome');

        $("<style id='kip'>").html(css).appendTo("head");



        var app = qlik.currApp();

        var getSheetList = function() {

            var defer = $q.defer();

            app.getAppObjectList(function(data) {
                var sheets = [];
                var sortedData = _.sortBy(data.qAppObjectList.qItems, function(item) {
                    return item.qData.rank;
                });
                _.each(sortedData, function(item) {
                    sheets.push({
                        value: item.qInfo.qId,
                        label: item.qMeta.title
                    });
                });
                return defer.resolve(sheets);
            });

            return defer.promise;
        };


        return {

            definition: {
                type: "items",
                component: "accordion",
                items: {
				
				
					custom:{
						label:'Custom Settings',
						 items: {
						 	 background: {
                                type: "string",
                                ref: "background",
                                label: "Background color 1",
                                expression: "optional",
								defaultValue: "='linear-gradient(60deg, red, blue)'"
                            },
                           

                            title: {
                                type: "string",
                                ref: "title",
                                label: "Title",
                                expression: "optional"
                            },
							
							ashtml1: {
								ref : "ashtml1",
								label : "Add HTML",
								type : "boolean",
								defaultValue : false
							},
							
                            icon: {
                                type: "string",
                                ref: "iconname",
                                label: "Icon Name",
                                expression: "optional"
                            },
                            
						 }
					},
					
					exp1:{
						label:'Main KPI Expression',
						 items: {
						 	
							value1: {
                                type: "string",
                                ref: "value1",
                                label: "Expression 1 for number",
                                expression: "optional"
                            },
                            unit: {
                                type: "string",
                                ref: "unit",
                                label: "Expression 1 Unit",
                                expression: "optional"
                            },
                            
						 }
					},
					
					left:{
						label:'Left KPI Expression',
						 items: {
						 	lefttxt: {
                                type: "string",
                                ref: "lefttxt",
                                label: "Left Text",
                                expression: "optional"
                            },
							ashtml2: {
								ref : "ashtml2",
								label : "Add HTML",
								type : "boolean",
								defaultValue : false
							},
                            lefticon: {
                                type: "string",
                                ref: "lefticon",
                                label: "Left icon",
                                expression: "optional"
                            },
                            
						 }
					},
					
					right:{
						label:'Right KPI Expression',
						 items: {
						 	exp1: {
                                type: "string",
                                ref: "exp1",
                                label: "exp 1",
                                expression: "optional"
                            },
							
							
							ashtml3: {
								ref : "ashtml3",
								label : "Add HTML",
								type : "boolean",
								defaultValue : false
							},
							
                            exp1icon: {
                                type: "string",
                                ref: "exp1icon",
                                label: "exp 1 icon",
                                expression: "optional"
                            },
                            exp1color: {
                                type: "string",
                                ref: "exp1color",
                                label: "exp 1 color",
                                expression: "optional"
                            },

                            exp2: {
                                type: "string",
                                ref: "exp2",
                                label: "exp 2",
                                expression: "optional"
                            },
							
							
							ashtml4: {
								ref : "ashtml4",
								label : "Add HTML",
								type : "boolean",
								defaultValue : false
							},
							
                            exp2icon: {
                                type: "string",
                                ref: "exp2icon",
                                label: "exp 2 icon",
                                expression: "optional"
                            },
                            exp2color: {
                                type: "string",
                                ref: "exp2color",
                                label: "exp 2 color",
                                expression: "optional"
                            },
                            
						 }
					},
					
					navtosheet:{
						label:'Navigation',
						 items: {
						 	sheetlst: {
                                type: "string",
                                component: "dropdown",
                                label: "Select Sheet",
                                ref: "gotosheet",
                                options: function() {
                                    return getSheetList().then(function(items) {
                                        return items;
                                    });
                                }
                            },
                            
						 }
					},
					
                    settings: {
                        uses: "settings",
                        items: {

							linkforiconpack: {
                                    	type: "string",
                                    	ref: "linkforiconpack",
                                    	label: "Link For Icon Pack",
                                    	expression: "optional"
                           },
                            /*
									navtosheet: {
                                    	type: "string",
                                    	ref: "gotosheet",
                                    	label: "Go To Sheet",
                                    	expression: "optional"
                                    },
									*/

                            //end


                        }
                    }
                }
            },

            //template: template,
            support: {
                snapshot: false,
                export: false,
                exportData: false
            },
            paint: function(element, layout) {
			
			
				if(layout.linkforiconpack == ''){
				
				}else{
					if($('#exticonpack_kpi2').length > 0){

						$('link#exticonpack_kpi2').remove();
						$('<link id="exticonpack_kpi2" rel="stylesheet" href="'+layout.linkforiconpack+'">').appendTo('head');              

					}else{
						$('<link id="exticonpack_kpi2" rel="stylesheet" href="'+layout.linkforiconpack+'">').appendTo('head');             
					}
				}
			
                var html = '';

                html += '';

                html += '<a class="goto" id="' + layout.gotosheet + '" href="javascript:;">';
                html += ' <div style=" width: 100%">';
                html += '  <div class="card card-stats">';
                html += '     <div class="card-header" style="background: '+layout.background+';">';
                
				if(layout.ashtml1){
					html += layout.iconname;
				}else{
					html += '      <i class="' + layout.iconname + '" aria-hidden="true"></i>';
                }
				
				html += '    </div>';
                html += '    <div class="card-content">';
                html += '       <p class="category">';
                html += '		' + layout.title + '';
                html += '		</p>';
                html += '       <h3 class="title">';
                html += '		' + layout.value1 + '';
                html += '          <small>';
                html += '		' + layout.unit + '';
                html += '		</small>';
                html += '      </h3>';
                html += '  </div>';
                html += '   <div class="card-footer">';
                html += '       <div class="stats">';
                
				if(layout.ashtml2){
					html += layout.lefticon;
				}else{
					html += '          <i class="' + layout.lefticon + '" aria-hidden="true"></i> ';
                }
				
				html += '		   ' + layout.lefttxt + '';
                html += '      </div>';
                html += '		 <div class="stats pull-right">';
                
				if(layout.ashtml3){
					html += layout.exp1icon;
				}else{
					html += '         <i class="' + layout.exp1icon + ' " aria-hidden="true" style="margin-right: 2px; color:' + layout.exp1color + ';"></i>     ';
                }
				
				html += '		    ' + layout.exp1 + '';
                
				if(layout.ashtml4){
					html += layout.iconname;
				}else{
					html += '		   <i class="' + layout.exp2icon + ' m-l-10 " aria-hidden="true" style="margin-right: 2px; color:' + layout.exp2color + ';"></i>  ';
                }
				
				html += '		   ' + layout.exp2 + '';
                html += '        </div>';
                html += '    </div>';
                html += '  </div>';
                html += '</div>';
                html += '  </a>  ';



                element.html(html);
			
			
			var result = qlik.navigation.getMode();
				if(result == 'analysis'){
					console.log('ANALYSIS');
					$('.goto').click(function() {
						console.log('click');
						qlik.navigation.gotoSheet($(this).attr('id'));
                	});
				 };
				
                


                $('.qv-object-x-kip2 .qv-object-header.thin').hide();


            },
            controller: ['$scope', function($scope) {

            }]
        };

    });