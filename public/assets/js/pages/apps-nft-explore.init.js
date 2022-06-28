var url = `${baseURL}public/assets/json/`,
	allproductlist = "",
	getJSON = function (e, t) {
		var l = new XMLHttpRequest();
		l.open("GET", url + e, !0),
			(l.responseType = "json"),
			(l.onload = function () {
				var e = l.status;
				t(200 === e ? null : e, l.response);
			}),
			l.send();
	};
function loadProductData(e) {
	(document.querySelector("#explorecard-list").innerHTML = ""),
		e.forEach(function (e, t) {
			var l = e.like ? "active" : "";
			(document.querySelector("#explorecard-list").innerHTML +=
				'<div class="col list-element">            <div class="card explore-box card-animate">                <div class="explore-place-bid-img">                    <input type="hidden" class="form-control" id="' +
				e.id +
				'">                    <div class="d-none">' +
				e.salesType +
				`</div>                    <img src="${baseURL}public/` +
				e.productImg +
				'" alt="" class="card-img-top explore-img" />                    <div class="bg-overlay"></div>                    <div class="place-bid-btn">                        <a href="#!" class="btn btn-success"><i class="ri-auction-fill align-bottom me-1"></i> Place Bid</a>                    </div>                </div>                <div class="bookmark-icon position-absolute top-0 end-0 p-2">                    <button type="button" class="btn btn-icon ' +
				l +
				'" data-bs-toggle="button" aria-pressed="true"><i class="mdi mdi-cards-heart fs-16"></i></button>                </div>                <div class="card-body">                    <p class="fw-medium mb-0 float-end"><i class="mdi mdi-heart text-danger align-middle"></i> ' +
				e.totalLikes +
				' </p>                    <h5 class="mb-1"><a href="apps-nft-item-details.html">' +
				e.title +
				'</a></h5>                    <p class="text-muted mb-0">' +
				e.category +
				'</p>                </div>                <div class="card-footer border-top border-top-dashed">                    <div class="d-flex align-items-center">                        <div class="flex-grow-1 fs-14">                            <i class="ri-price-tag-3-fill text-warning align-bottom me-1"></i> Highest: <span class="fw-medium">' +
				e.highBid +
				'</span>                        </div>                        <h5 class="flex-shrink-0 fs-14 text-primary mb-0">' +
				e.price +
				"ETH</h5>                    </div>                </div>            </div>        </div>"),
				loadMoreBtn();
		});
}
getJSON("nft-explore-product-list.json", function (e, t) {
	null !== e
		? console.log("Something went wrong: " + e)
		: loadProductData((allproductlist = t));
});
var searchProductList = document.getElementById("searchProductList");
searchProductList.addEventListener("keyup", function () {
	var e = searchProductList.value.toLowerCase();
	var t,
		e =
			((t = e),
			allproductlist.filter(function (e) {
				return -1 !== e.title.toLowerCase().indexOf(t.toLowerCase());
			}));
	0 == e.length
		? ((document.getElementById("noresult").style.display = "block"),
		  (document.getElementById("loadmore").style.display = "none"))
		: ((document.getElementById("noresult").style.display = "none"),
		  (document.getElementById("loadmore").style.display = "block")),
		loadProductData(e);
});
var productCategoryInput = new Choices(
	document.getElementById("select-category"),
	{ searchEnabled: !1 }
);
productCategoryInput.passedElement.element.addEventListener(
	"change",
	function (e) {
		var t,
			l = e.detail.value;
		e.detail.value
			? 0 == (t = allproductlist.filter((e) => e.category === l)).length
				? ((document.getElementById("noresult").style.display = "block"),
				  (document.getElementById("loadmore").style.display = "none"))
				: ((document.getElementById("noresult").style.display = "none"),
				  (document.getElementById("loadmore").style.display = "block"))
			: (t = allproductlist),
			loadProductData(t);
	},
	!1
);
var productFileTypeInput = new Choices(document.getElementById("file-type"), {
	searchEnabled: !1,
});
productFileTypeInput.passedElement.element.addEventListener(
	"change",
	function (e) {
		var t,
			l = e.detail.value;
		e.detail.value
			? 0 ==
			  (t = allproductlist.filter((e) => e.productImg.split(".").pop() == l))
					.length
				? ((document.getElementById("noresult").style.display = "block"),
				  (document.getElementById("loadmore").style.display = "none"))
				: ((document.getElementById("noresult").style.display = "none"),
				  (document.getElementById("loadmore").style.display = "block"))
			: (t = allproductlist),
			loadProductData(t);
	},
	!1
),
	(productCategoryInput = new Choices(
		document.getElementById("select-category"),
		{ searchEnabled: !1 }
	)).passedElement.element.addEventListener(
		"change",
		function (e) {
			var t,
				l = e.detail.value;
			e.detail.value
				? 0 == (t = allproductlist.filter((e) => e.category === l)).length
					? ((document.getElementById("noresult").style.display = "block"),
					  (document.getElementById("loadmore").style.display = "none"))
					: ((document.getElementById("noresult").style.display = "none"),
					  (document.getElementById("loadmore").style.display = "block"))
				: (t = allproductlist),
				loadProductData(t);
		},
		!1
	);
var productSalesInputInput = new Choices(
	document.getElementById("all-sales-type"),
	{ searchEnabled: !1 }
);
productSalesInputInput.passedElement.element.addEventListener(
	"change",
	function (e) {
		var t,
			l = e.detail.value;
		e.detail.value
			? 0 == (t = allproductlist.filter((e) => e.salesType === l)).length
				? ((document.getElementById("noresult").style.display = "block"),
				  (document.getElementById("loadmore").style.display = "none"))
				: ((document.getElementById("noresult").style.display = "none"),
				  (document.getElementById("loadmore").style.display = "block"))
			: (t = allproductlist),
			loadProductData(t);
	},
	!1
);
var rangeProductPrice = document.getElementById("range-product-price");
noUiSlider.create(rangeProductPrice, {
	start: [0, 1e3],
	step: 10,
	margin: 20,
	connect: !0,
	behaviour: "tap-drag",
	tooltips: [!0, !0],
	range: { min: 0, max: 2e3 },
	format: wNumb({ decimals: 0 }),
}),
	mergeTooltips(rangeProductPrice, 5, " - ");
var minCostInput = document.getElementById("minCost"),
	maxCostInput = document.getElementById("maxCost"),
	filterDataAll = "";
function mergeTooltips(e, c, u) {
	var m = "rtl" === getComputedStyle(e).direction,
		p = "rtl" === e.noUiSlider.options.direction,
		y = "vertical" === e.noUiSlider.options.orientation,
		g = e.noUiSlider.getTooltips(),
		l = e.noUiSlider.getOrigins();
	g.forEach(function (e, t) {
		e && l[t].appendChild(e);
	}),
		e &&
			e.noUiSlider.on("update", function (e, t, l, o, n) {
				var a = [[]],
					i = [[]],
					s = [[]],
					d = 0;
				g[0] && ((a[0][0] = 0), (i[0][0] = n[0]), (s[0][0] = e[0]));
				for (var r = 1; r < n.length; r++)
					(!g[r] || n[r] - n[r - 1] > c) &&
						((a[++d] = []), (s[d] = []), (i[d] = [])),
						g[r] && (a[d].push(r), s[d].push(e[r]), i[d].push(n[r]));
				a.forEach(function (e, t) {
					for (var l = e.length, o = 0; o < l; o++) {
						var n,
							a,
							d,
							r = e[o];
						o === l - 1
							? ((d = 0),
							  i[t].forEach(function (e) {
									d += 1e3 - e;
							  }),
							  (n = y ? "bottom" : "right"),
							  (a = 1e3 - i[t][p ? 0 : l - 1]),
							  (d = (m && !y ? 100 : 0) + d / l - a),
							  (g[r].innerHTML = s[t].join(u)),
							  (g[r].style.display = "block"),
							  (g[r].style[n] = d + "%"))
							: (g[r].style.display = "none");
					}
				});
			});
}
function _toConsumableArray(e) {
	if (Array.isArray(e)) {
		for (var t = 0, l = Array(e.length); t < e.length; t++) l[t] = e[t];
		return l;
	}
	return Array.from(e);
}
function loadMoreBtn() {
	var o,
		e = document.querySelector("#loadmore");
	e &&
		((o = 10),
		e.addEventListener("click", function (e) {
			var t = [].concat(
				_toConsumableArray(
					document.querySelectorAll("#explorecard-list .list-element")
				)
			);
			if (t) {
				for (var l = o; l < o + 5; l++) t[l] && (t[l].style.display = "block");
				(o += 5) >= t.length && (event.target.style.display = "none");
			}
		}));
}
rangeProductPrice.noUiSlider.on("change", function (e, t) {
	var l = allproductlist;
	t ? (maxCostInput.value = e[t]) : (minCostInput.value = e[t]);
	var o = maxCostInput.value,
		n = minCostInput.value;
	loadProductData(
		l.filter((e) => parseFloat(e.price) >= n && parseFloat(e.price) <= o)
	);
});
