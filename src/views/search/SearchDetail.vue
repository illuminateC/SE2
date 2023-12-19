<template>
  <!-- 搜索详情页的总体页面 -->
  <div class="search-detail-container clearfix">
    <!-- 上部分，用户放置搜索框 -->
    <div class="search-area">
      <div class="search-area-handler">
        <SearchInput
          @final-search="handleFinalSearch"
          class="search-input"
        />
      </div>
    </div>
    <!-- 主体部分，左侧用于放置搜索筛选，右侧用于存放搜索结果 -->
    <div class="result-area">
      <div class="result-content clearfix">
        <div class="row clearfix">
          <!-- 左侧筛选部分 -->
          <div class="col-lg-3 col-md-3 col-sm-4">
            <div class="sticko__child colored-block">
              <!--
                AllTypeFilterList[searchStore.searchType] 即当前搜索的实体类型对应的筛选列表
                该div包裹的是 单个筛选单元
                item 是 当前实体类型对应的 筛选列表 中的单个筛选单元，
                index 是该筛选单元在 当前实体类型对应的 筛选列表 中的数组索引下标
               -->
              <div
                class="colored-block"
                v-for="(item, index) in AllTypeFilterList[searchStore.searchType]"
                :key="index"
                :ref="setFilterUnitDOM"
              >
                <!-- 筛选块标题 -->
                <div
                  class="colored-block-title clearfix"
                  @click="handleAllTypeGroupSearch(filterUnitDOM[index], index)"
                >
                  <div class="colored-block-title-context">{{item.title}}</div>
                  <i class="iconfont icon-arrowup colored-block-icon"></i>
                </div>
                <!-- 折叠栏 -->
                <div class="colored-block-content">
                  <!-- 过滤块 -->
                  <div class="filter-block">
                    <div class="accordion-content">
                      <!-- 这里第一个[]是属性键值，第二个[]才是数组索引 -->
                      <ElCheckboxGroup
                        v-model="AllTypeFilterList[searchStore.searchType][index].selectedArray"
                        @change="handleChange(index)"
                      >
                        <ul class="rlist expand__list">
                          <li v-for="labelItem in AllTypeFilterList[searchStore.searchType][index].objectArray" :key="labelItem">
                            <!--
                              VERY IMPORTANT
                              这里 label属性 代表选中时，添加进入 ElCheckboxGroup 的v-model绑定的数组的值
                              我们选择 labelItem 代表的这项（实际上是根据labelItem.key_display_name选择）
                              实际上是把 labelItem.key 添加进入了对应的数组
                             -->
                            <ElCheckbox :label="labelItem.key">
                              <span class="chose-label">{{labelItem.key_display_name}}</span>&nbsp;&nbsp;
                              <span class="chose-num">({{labelItem.count}})</span>
                            </ElCheckbox>
                          </li>
                        </ul>
                      </ElCheckboxGroup>
                    </div>
                  </div>
                  <!-- 底部色块 -->
                  <div class="end-dash"></div>
                </div>
              </div>
            </div>
          </div>
          <!-- 右侧结果/排序部分 -->
          <div class="col-lg-9 col-md-9 col-sm-8">
            <div class="search-result" >
              <!-- 搜索结果顶部信息 -->
              <div class="search-result__info">
                <div class="search-num-info">
                  <span class="left-border-span"></span>
                  <div class="search-num-info-detail">
                    <span class="hitlength">{{toThousands(totalSearchResNum)}}</span>
                    <span> Results</span>
                    <span> for: </span>
                  </div>
                </div>
              </div>
              <!-- 随着滚动 sticky 在header下方的筛选栏 -->
              <div class="search-result__sort clearfix">
                <div class="filter-btn-wrapper" :class="{'extended': confirmFilterSearch}">
                  <button class="confirm-filter-btn" @click="handleAllTypeFilterSearch">
                    确认筛选
                    <span></span>
                  </button>
                </div>
                <div class="filter-btn-wrapper" :class="{'extended': confirmFilterSearch}">
                  <button class="cancel-filter-btn" @click="cancelFilterSearch">
                    取消筛选
                    <span></span>
                  </button>
                </div>
                <div class="search-result__sort-right">
                  <!-- 每页尺寸 -->
                  <div class="per-page">
                    <span class="per-page-label">Per Page: </span>
                    <ul class="rlist--inline">
                      <li
                        class="page-size-chose"
                        v-for="(size, index) in pageSizeArray"
                        :key="size"
                        @click="handlePageSizeChangeSearch(index)"
                        :ref="setPageSizeDom"
                      >
                        {{size}}
                      </li>
                    </ul>
                  </div>
                  <!-- 排序类型 -->
                  <div class="sort-type" ref="sortDropdownTarget">
                    <button class="sort-type-btn" @click="expandSortDropdown">
                      <b>Sort Type: </b>
                      <span> {{ searchStore.sortType }}</span>
                      <i class="iconfont icon-arrowup"></i>
                    </button>
                    <div class="sort-dropdown">
                      <ul class="rlist">
                        <li
                          v-for="item in remainSortTypeArray"
                          :key="item"
                          @click="handleAllTypeSortSearch(item)"
                        >
                          {{item}}
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              <!-- 搜索结果主体 -->
<!--              <component :is="searchResCard[0]" :item="exampleItem"/>-->
              <ul class="rlist" v-show="totalSearchResNum">
                <!-- 单个搜索结果卡片 -->
                  <li class="result-item" v-for="item in searchDataList" :key="item">
                      <component :is="searchResCard[searchStore.searchType]" :item="item" />
                  </li>
              </ul>
              <ElEmpty v-show="!totalSearchResNum" description="No Result Found"/>
              <!-- 分页器，由于分页只能取到前1万条数据，这里做一个限制 -->
              <div class="search-result__pagination">
                <div class="pagination-container">
                  <ElPagination
                    hide-on-single-page
                    v-model:current-page="searchResPageIndex"
                    v-model:page-size="searchResPageSize"
                    :total="(totalSearchResNum > 10000
                      ? 10000
                      : totalSearchResNum)"
                    layout="prev, pager, next, jumper"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<!--
整体的搜索应对刷新的逻辑是：
  刷新页面以后，依然按照用户设定的 searchType searchText pageSize sortType 进行一次搜索
  但是过滤条件对象重置为空，不向后端传递。pageIndex 重置为 1。即：
  “保留 搜索实体类型、搜索文本、用户选定的每页数据尺寸、用户选定的排序方式；
  取消 用户设置的筛选条件；重置当前页索引是 1”
 -->
<script>
const allEntitySortType = {
  "works": ["Relevance", "Earliest", "Latest", "Cited"],
  "authors": ["Relevance", "More Works", "Less Works", "Cited"],
  "venues": ["Relevance", "More Works", "Less Works", "Cited"],
  "institutions": ["Relevance", "More Works", "Less Works", "Cited"],
  "concepts": ["Relevance", "More Works", "Less Works", "Cited"],
};
const pageSizeArray = [5, 10, 20];
</script>

<script setup>
import { toThousands } from '@/utils';
import { Search } from '@/api/search';
import { useSearchStore } from '@/stores/search';
import { onMounted, reactive, ref, shallowRef, watch } from 'vue';
import { useRoute } from 'vue-router';
import { ElCheckbox, ElCheckboxGroup, ElEmpty, ElNotification, ElPagination } from "element-plus";
import SearchInput from '../../components/SearchInput/Search.vue';
import WorksResCard from './WorksResCard.vue';
import AuthorsResCard from './AuthorsResCard.vue';
import VenuesResCard from './VenuesResCard.vue';
import InstitutionsResCard from './InstitutionsResCard.vue';
import ConceptsResCard from './ConceptsResCard.vue';


onMounted(() => {
  // 默认选中 index = 1 的 每页10条
  chosePageSize(1);
  // 触发一次搜索
  handleFinalSearch(searchStore.searchInputText, searchStore.searchType);
});
// 和动态组件配合，实现在搜索实体不同时，返回不同的卡片类型
const searchResCard = shallowRef({
  "works": WorksResCard,
  "authors": AuthorsResCard,
  "venues": VenuesResCard,
  "institutions": InstitutionsResCard,
  "concepts": ConceptsResCard,
});

const searchStore = useSearchStore();

/**
 * 和主页地球点击跳转搜索相配合，获取路由query参数。
 * 我这里约定字段为 countrySearch
 * /search-detail?countrySearch=facebook
 */
const route = useRoute();
if (route.query.countrySearch) {
  searchStore.searchType = "works";
  searchStore.searchInputText = route.query.countrySearch;
}

const getdatalistres= {
    "msgno": 1,
    "msg": "获取论文列表成功",
    "list_of_entity_data": [
        {
            "meta": {
                "count": 31124423,
                "db_response_time_ms": 59,
                "page": 1,
                "per_page": 15,
                "groups_count": null
            },
            "results": [
                {
                    "id": "https://openalex.org/W4256047907",
                    "doi": "https://doi.org/10.1007/978-1-349-19059-1_25",
                    "title": null,
                    "display_name": null,
                    "publication_year": 1400,
                    "publication_date": "1400-01-01",
                    "ids": {
                        "openalex": "https://openalex.org/W4256047907",
                        "doi": "https://doi.org/10.1007/978-1-349-19059-1_25"
                    },
                    "language": null,
                    "primary_location": {
                        "is_oa": false,
                        "landing_page_url": "https://doi.org/10.1007/978-1-349-19059-1_25",
                        "pdf_url": null,
                        "source": {
                            "id": "https://openalex.org/S4306488690",
                            "display_name": "Macmillan Education UK-London eBooks",
                            "issn_l": null,
                            "issn": null,
                            "is_oa": false,
                            "is_in_doaj": false,
                            "host_organization": null,
                            "host_organization_name": null,
                            "host_organization_lineage": [],
                            "host_organization_lineage_names": [],
                            "type": "ebook platform"
                        },
                        "license": null,
                        "version": null,
                        "is_accepted": false,
                        "is_published": false
                    },
                    "type": "book-chapter",
                    "type_crossref": "book-chapter",
                    "open_access": {
                        "is_oa": -1,
                        "oa_status": "closed",
                        "oa_url": null,
                        "any_repository_has_fulltext": false
                    },
                    "authorships": [
                        {
                            "author_position": "first",
                            "author": {
                                "id": "https://openalex.org/A5019765592",
                                "display_name": "Fredric Jameson",
                                "orcid": null
                            },
                            "institutions": [],
                            "countries": [],
                            "is_corresponding": true,
                            "raw_author_name": "Fredric Jameson",
                            "raw_affiliation_string": "",
                            "raw_affiliation_strings": []
                        }
                    ],
                    "countries_distinct_count": 0,
                    "institutions_distinct_count": 0,
                    "corresponding_author_ids": [
                        "https://openalex.org/A5019765592"
                    ],
                    "corresponding_institution_ids": [],
                    "apc_list": null,
                    "apc_paid": null,
                    "has_fulltext": false,
                    "cited_by_count": 378,
                    "cited_by_percentile_year": {
                        "min": 99,
                        "max": 100
                    },
                    "biblio": {
                        "volume": null,
                        "issue": null,
                        "first_page": null,
                        "last_page": null
                    },
                    "is_retracted": false,
                    "is_paratext": false,
                    "keywords": [],
                    "concepts": [
                        {
                            "id": "https://openalex.org/C205649164",
                            "wikidata": "https://www.wikidata.org/wiki/Q1071",
                            "display_name": "Geography",
                            "level": 0,
                            "score": 0.29129717
                        }
                    ],
                    "mesh": [],
                    "locations_count": 1,
                    "locations": [
                        {
                            "is_oa": false,
                            "landing_page_url": "https://doi.org/10.1007/978-1-349-19059-1_25",
                            "pdf_url": null,
                            "source": {
                                "id": "https://openalex.org/S4306488690",
                                "display_name": "Macmillan Education UK-London eBooks",
                                "issn_l": null,
                                "issn": null,
                                "is_oa": false,
                                "is_in_doaj": false,
                                "host_organization": null,
                                "host_organization_name": null,
                                "host_organization_lineage": [],
                                "host_organization_lineage_names": [],
                                "type": "ebook platform"
                            },
                            "license": null,
                            "version": null,
                            "is_accepted": false,
                            "is_published": false
                        }
                    ],
                    "best_oa_location": null,
                    "sustainable_development_goals": [],
                    "grants": [],
                    "referenced_works_count": 0,
                    "referenced_works": [],
                    "related_works": [
                        "https://openalex.org/W5929680",
                        "https://openalex.org/W4701107",
                        "https://openalex.org/W13173603",
                        "https://openalex.org/W4132344",
                        "https://openalex.org/W10330884",
                        "https://openalex.org/W1354100",
                        "https://openalex.org/W1970489",
                        "https://openalex.org/W9775490",
                        "https://openalex.org/W2109451",
                        "https://openalex.org/W10696645"
                    ],
                    "ngrams_url": "https://api.openalex.org/works/W4256047907/ngrams",
                    "abstract_inverted_index": null,
                    "cited_by_api_url": "https://api.openalex.org/works?filter=cites:W4256047907",
                    "counts_by_year": [
                        {
                            "year": 2023,
                            "cited_by_count": 3
                        },
                        {
                            "year": 2022,
                            "cited_by_count": 10
                        },
                        {
                            "year": 2021,
                            "cited_by_count": 26
                        },
                        {
                            "year": 2020,
                            "cited_by_count": 12
                        },
                        {
                            "year": 2019,
                            "cited_by_count": 22
                        },
                        {
                            "year": 2018,
                            "cited_by_count": 20
                        },
                        {
                            "year": 2017,
                            "cited_by_count": 7
                        },
                        {
                            "year": 2016,
                            "cited_by_count": 15
                        },
                        {
                            "year": 2015,
                            "cited_by_count": 4
                        },
                        {
                            "year": 2014,
                            "cited_by_count": 17
                        },
                        {
                            "year": 2013,
                            "cited_by_count": 40
                        },
                        {
                            "year": 2012,
                            "cited_by_count": 7
                        }
                    ],
                    "updated_date": "2023-12-18T00:16:04.351286",
                    "created_date": "2022-05-12",
                    "abstract": "",
                    "2023_cited_count": 3
                },
                {
                    "id": "https://openalex.org/W2503643158",
                    "doi": "https://doi.org/10.1007/978-1-4899-3324-9_6",
                    "title": null,
                    "display_name": null,
                    "publication_year": 1400,
                    "publication_date": "1400-01-01",
                    "ids": {
                        "openalex": "https://openalex.org/W2503643158",
                        "doi": "https://doi.org/10.1007/978-1-4899-3324-9_6",
                        "mag": "2503643158"
                    },
                    "language": null,
                    "primary_location": {
                        "is_oa": false,
                        "landing_page_url": "https://doi.org/10.1007/978-1-4899-3324-9_6",
                        "pdf_url": null,
                        "source": {
                            "id": "https://openalex.org/S4306463937",
                            "display_name": "Springer eBooks",
                            "issn_l": null,
                            "issn": null,
                            "is_oa": false,
                            "is_in_doaj": false,
                            "host_organization": null,
                            "host_organization_name": null,
                            "host_organization_lineage": [],
                            "host_organization_lineage_names": [],
                            "type": "ebook platform"
                        },
                        "license": null,
                        "version": null,
                        "is_accepted": false,
                        "is_published": false
                    },
                    "type": "book-chapter",
                    "type_crossref": "book-chapter",
                    "open_access": {
                        "is_oa": -1,
                        "oa_status": "closed",
                        "oa_url": null,
                        "any_repository_has_fulltext": false
                    },
                    "authorships": [
                        {
                            "author_position": "first",
                            "author": {
                                "id": "https://openalex.org/A5084424690",
                                "display_name": "B. W. Silverman",
                                "orcid": null
                            },
                            "institutions": [],
                            "countries": [],
                            "is_corresponding": true,
                            "raw_author_name": "B. W. Silverman",
                            "raw_affiliation_string": "",
                            "raw_affiliation_strings": []
                        }
                    ],
                    "countries_distinct_count": 0,
                    "institutions_distinct_count": 0,
                    "corresponding_author_ids": [
                        "https://openalex.org/A5084424690"
                    ],
                    "corresponding_institution_ids": [],
                    "apc_list": null,
                    "apc_paid": null,
                    "has_fulltext": false,
                    "cited_by_count": 106,
                    "cited_by_percentile_year": {
                        "min": 99,
                        "max": 100
                    },
                    "biblio": {
                        "volume": null,
                        "issue": null,
                        "first_page": null,
                        "last_page": null
                    },
                    "is_retracted": false,
                    "is_paratext": false,
                    "keywords": [],
                    "concepts": [
                        {
                            "id": "https://openalex.org/C17744445",
                            "wikidata": "https://www.wikidata.org/wiki/Q36442",
                            "display_name": "Political science",
                            "level": 0,
                            "score": 0.2560984
                        }
                    ],
                    "mesh": [],
                    "locations_count": 1,
                    "locations": [
                        {
                            "is_oa": false,
                            "landing_page_url": "https://doi.org/10.1007/978-1-4899-3324-9_6",
                            "pdf_url": null,
                            "source": {
                                "id": "https://openalex.org/S4306463937",
                                "display_name": "Springer eBooks",
                                "issn_l": null,
                                "issn": null,
                                "is_oa": false,
                                "is_in_doaj": false,
                                "host_organization": null,
                                "host_organization_name": null,
                                "host_organization_lineage": [],
                                "host_organization_lineage_names": [],
                                "type": "ebook platform"
                            },
                            "license": null,
                            "version": null,
                            "is_accepted": false,
                            "is_published": false
                        }
                    ],
                    "best_oa_location": null,
                    "sustainable_development_goals": [],
                    "grants": [],
                    "referenced_works_count": 0,
                    "referenced_works": [],
                    "related_works": [
                        "https://openalex.org/W204885769",
                        "https://openalex.org/W1492238782",
                        "https://openalex.org/W1521645938",
                        "https://openalex.org/W1551262473",
                        "https://openalex.org/W1603434342",
                        "https://openalex.org/W1969594241",
                        "https://openalex.org/W1990792238",
                        "https://openalex.org/W2014268383",
                        "https://openalex.org/W2097996710",
                        "https://openalex.org/W2118020555",
                        "https://openalex.org/W2128690842",
                        "https://openalex.org/W2129905273",
                        "https://openalex.org/W2163288162",
                        "https://openalex.org/W2208290741",
                        "https://openalex.org/W2337490104",
                        "https://openalex.org/W2512895767",
                        "https://openalex.org/W2615695955",
                        "https://openalex.org/W2963598025",
                        "https://openalex.org/W3019018630",
                        "https://openalex.org/W3204705402"
                    ],
                    "ngrams_url": "https://api.openalex.org/works/W2503643158/ngrams",
                    "abstract_inverted_index": null,
                    "cited_by_api_url": "https://api.openalex.org/works?filter=cites:W2503643158",
                    "counts_by_year": [
                        {
                            "year": 2021,
                            "cited_by_count": 4
                        },
                        {
                            "year": 2020,
                            "cited_by_count": 10
                        },
                        {
                            "year": 2019,
                            "cited_by_count": 12
                        },
                        {
                            "year": 2018,
                            "cited_by_count": 9
                        },
                        {
                            "year": 2017,
                            "cited_by_count": 6
                        },
                        {
                            "year": 2016,
                            "cited_by_count": 4
                        },
                        {
                            "year": 2015,
                            "cited_by_count": 4
                        },
                        {
                            "year": 2014,
                            "cited_by_count": 12
                        },
                        {
                            "year": 2013,
                            "cited_by_count": 4
                        },
                        {
                            "year": 2012,
                            "cited_by_count": 6
                        }
                    ],
                    "updated_date": "2023-12-18T04:09:45.694231",
                    "created_date": "2016-08-23",
                    "abstract": "",
                    "2023_cited_count": 0
                },
                {
                    "id": "https://openalex.org/W2478691652",
                    "doi": "https://doi.org/10.1007/978-1-349-19059-1_2",
                    "title": null,
                    "display_name": null,
                    "publication_year": 1400,
                    "publication_date": "1400-01-01",
                    "ids": {
                        "openalex": "https://openalex.org/W2478691652",
                        "doi": "https://doi.org/10.1007/978-1-349-19059-1_2",
                        "mag": "2478691652"
                    },
                    "language": null,
                    "primary_location": {
                        "is_oa": false,
                        "landing_page_url": "https://doi.org/10.1007/978-1-349-19059-1_2",
                        "pdf_url": null,
                        "source": {
                            "id": "https://openalex.org/S4306488690",
                            "display_name": "Macmillan Education UK-London eBooks",
                            "issn_l": null,
                            "issn": null,
                            "is_oa": false,
                            "is_in_doaj": false,
                            "host_organization": null,
                            "host_organization_name": null,
                            "host_organization_lineage": [],
                            "host_organization_lineage_names": [],
                            "type": "ebook platform"
                        },
                        "license": null,
                        "version": null,
                        "is_accepted": false,
                        "is_published": false
                    },
                    "type": "book-chapter",
                    "type_crossref": "book-chapter",
                    "open_access": {
                        "is_oa": -1,
                        "oa_status": "closed",
                        "oa_url": null,
                        "any_repository_has_fulltext": false
                    },
                    "authorships": [
                        {
                            "author_position": "first",
                            "author": {
                                "id": "https://openalex.org/A5014481210",
                                "display_name": "Cornel West",
                                "orcid": null
                            },
                            "institutions": [],
                            "countries": [],
                            "is_corresponding": true,
                            "raw_author_name": "Cornel West",
                            "raw_affiliation_string": "",
                            "raw_affiliation_strings": []
                        }
                    ],
                    "countries_distinct_count": 0,
                    "institutions_distinct_count": 0,
                    "corresponding_author_ids": [
                        "https://openalex.org/A5014481210"
                    ],
                    "corresponding_institution_ids": [],
                    "apc_list": null,
                    "apc_paid": null,
                    "has_fulltext": false,
                    "cited_by_count": 83,
                    "cited_by_percentile_year": {
                        "min": 99,
                        "max": 100
                    },
                    "biblio": {
                        "volume": null,
                        "issue": null,
                        "first_page": null,
                        "last_page": null
                    },
                    "is_retracted": false,
                    "is_paratext": false,
                    "keywords": [],
                    "concepts": [
                        {
                            "id": "https://openalex.org/C41008148",
                            "wikidata": "https://www.wikidata.org/wiki/Q21198",
                            "display_name": "Computer science",
                            "level": 0,
                            "score": 0.2521838
                        }
                    ],
                    "mesh": [],
                    "locations_count": 1,
                    "locations": [
                        {
                            "is_oa": false,
                            "landing_page_url": "https://doi.org/10.1007/978-1-349-19059-1_2",
                            "pdf_url": null,
                            "source": {
                                "id": "https://openalex.org/S4306488690",
                                "display_name": "Macmillan Education UK-London eBooks",
                                "issn_l": null,
                                "issn": null,
                                "is_oa": false,
                                "is_in_doaj": false,
                                "host_organization": null,
                                "host_organization_name": null,
                                "host_organization_lineage": [],
                                "host_organization_lineage_names": [],
                                "type": "ebook platform"
                            },
                            "license": null,
                            "version": null,
                            "is_accepted": false,
                            "is_published": false
                        }
                    ],
                    "best_oa_location": null,
                    "sustainable_development_goals": [],
                    "grants": [],
                    "referenced_works_count": 0,
                    "referenced_works": [],
                    "related_works": [
                        "https://openalex.org/W222029668",
                        "https://openalex.org/W2090109489",
                        "https://openalex.org/W2510352135",
                        "https://openalex.org/W2139356879",
                        "https://openalex.org/W2048926510",
                        "https://openalex.org/W3027011768",
                        "https://openalex.org/W2552382703",
                        "https://openalex.org/W1994516721",
                        "https://openalex.org/W583608238",
                        "https://openalex.org/W2148742359"
                    ],
                    "ngrams_url": "https://api.openalex.org/works/W2478691652/ngrams",
                    "abstract_inverted_index": null,
                    "cited_by_api_url": "https://api.openalex.org/works?filter=cites:W2478691652",
                    "counts_by_year": [
                        {
                            "year": 2022,
                            "cited_by_count": 2
                        },
                        {
                            "year": 2019,
                            "cited_by_count": 1
                        },
                        {
                            "year": 2018,
                            "cited_by_count": 3
                        },
                        {
                            "year": 2016,
                            "cited_by_count": 3
                        },
                        {
                            "year": 2015,
                            "cited_by_count": 1
                        },
                        {
                            "year": 2013,
                            "cited_by_count": 4
                        },
                        {
                            "year": 2012,
                            "cited_by_count": 3
                        }
                    ],
                    "updated_date": "2023-12-16T12:43:05.313054",
                    "created_date": "2016-08-23",
                    "abstract": "",
                    "2023_cited_count": 0
                },
                {
                    "id": "https://openalex.org/W4294309241",
                    "doi": "https://doi.org/10.1007/978-1-349-19059-1_21",
                    "title": null,
                    "display_name": null,
                    "publication_year": 1400,
                    "publication_date": "1400-01-01",
                    "ids": {
                        "openalex": "https://openalex.org/W4294309241",
                        "doi": "https://doi.org/10.1007/978-1-349-19059-1_21"
                    },
                    "language": null,
                    "primary_location": {
                        "is_oa": false,
                        "landing_page_url": "https://doi.org/10.1007/978-1-349-19059-1_21",
                        "pdf_url": null,
                        "source": {
                            "id": "https://openalex.org/S4306488690",
                            "display_name": "Macmillan Education UK-London eBooks",
                            "issn_l": null,
                            "issn": null,
                            "is_oa": false,
                            "is_in_doaj": false,
                            "host_organization": null,
                            "host_organization_name": null,
                            "host_organization_lineage": [],
                            "host_organization_lineage_names": [],
                            "type": "ebook platform"
                        },
                        "license": null,
                        "version": null,
                        "is_accepted": false,
                        "is_published": false
                    },
                    "type": "book-chapter",
                    "type_crossref": "book-chapter",
                    "open_access": {
                        "is_oa": -1,
                        "oa_status": "closed",
                        "oa_url": null,
                        "any_repository_has_fulltext": false
                    },
                    "authorships": [],
                    "countries_distinct_count": 0,
                    "institutions_distinct_count": 0,
                    "corresponding_author_ids": [],
                    "corresponding_institution_ids": [],
                    "apc_list": null,
                    "apc_paid": null,
                    "has_fulltext": false,
                    "cited_by_count": 45,
                    "cited_by_percentile_year": {
                        "min": 98,
                        "max": 99
                    },
                    "biblio": {
                        "volume": null,
                        "issue": null,
                        "first_page": null,
                        "last_page": null
                    },
                    "is_retracted": false,
                    "is_paratext": false,
                    "keywords": [],
                    "concepts": [
                        {
                            "id": "https://openalex.org/C127313418",
                            "wikidata": "https://www.wikidata.org/wiki/Q1069",
                            "display_name": "Geology",
                            "level": 0,
                            "score": 0.26199865
                        }
                    ],
                    "mesh": [],
                    "locations_count": 1,
                    "locations": [
                        {
                            "is_oa": false,
                            "landing_page_url": "https://doi.org/10.1007/978-1-349-19059-1_21",
                            "pdf_url": null,
                            "source": {
                                "id": "https://openalex.org/S4306488690",
                                "display_name": "Macmillan Education UK-London eBooks",
                                "issn_l": null,
                                "issn": null,
                                "is_oa": false,
                                "is_in_doaj": false,
                                "host_organization": null,
                                "host_organization_name": null,
                                "host_organization_lineage": [],
                                "host_organization_lineage_names": [],
                                "type": "ebook platform"
                            },
                            "license": null,
                            "version": null,
                            "is_accepted": false,
                            "is_published": false
                        }
                    ],
                    "best_oa_location": null,
                    "sustainable_development_goals": [],
                    "grants": [],
                    "referenced_works_count": 0,
                    "referenced_works": [],
                    "related_works": [
                        "https://openalex.org/W2607003854",
                        "https://openalex.org/W2353509181",
                        "https://openalex.org/W2391101519",
                        "https://openalex.org/W2391796066",
                        "https://openalex.org/W2349755843",
                        "https://openalex.org/W2363882339",
                        "https://openalex.org/W2374201185",
                        "https://openalex.org/W2363590441",
                        "https://openalex.org/W2352388778",
                        "https://openalex.org/W2347241993"
                    ],
                    "ngrams_url": "https://api.openalex.org/works/W4294309241/ngrams",
                    "abstract_inverted_index": null,
                    "cited_by_api_url": "https://api.openalex.org/works?filter=cites:W4294309241",
                    "counts_by_year": [
                        {
                            "year": 2021,
                            "cited_by_count": 1
                        },
                        {
                            "year": 2020,
                            "cited_by_count": 1
                        },
                        {
                            "year": 2019,
                            "cited_by_count": 1
                        },
                        {
                            "year": 2016,
                            "cited_by_count": 1
                        }
                    ],
                    "updated_date": "2023-12-11T02:44:33.231264",
                    "created_date": "2022-09-02",
                    "abstract": "",
                    "2023_cited_count": 0
                },
                {
                    "id": "https://openalex.org/W2483224560",
                    "doi": "https://doi.org/10.1007/978-1-349-19059-1_41",
                    "title": "Communications in Socialist France: The Difficulty of Matching Technology with Democracy",
                    "display_name": "Communications in Socialist France: The Difficulty of Matching Technology with Democracy",
                    "publication_year": 1400,
                    "publication_date": "1400-01-01",
                    "ids": {
                        "openalex": "https://openalex.org/W2483224560",
                        "doi": "https://doi.org/10.1007/978-1-349-19059-1_41",
                        "mag": "2483224560"
                    },
                    "language": "en",
                    "primary_location": {
                        "is_oa": false,
                        "landing_page_url": "https://doi.org/10.1007/978-1-349-19059-1_41",
                        "pdf_url": null,
                        "source": {
                            "id": "https://openalex.org/S4306488690",
                            "display_name": "Macmillan Education UK-London eBooks",
                            "issn_l": null,
                            "issn": null,
                            "is_oa": false,
                            "is_in_doaj": false,
                            "host_organization": null,
                            "host_organization_name": null,
                            "host_organization_lineage": [],
                            "host_organization_lineage_names": [],
                            "type": "ebook platform"
                        },
                        "license": null,
                        "version": null,
                        "is_accepted": false,
                        "is_published": false
                    },
                    "type": "book-chapter",
                    "type_crossref": "book-chapter",
                    "open_access": {
                        "is_oa": -1,
                        "oa_status": "closed",
                        "oa_url": null,
                        "any_repository_has_fulltext": false
                    },
                    "authorships": [
                        {
                            "author_position": "first",
                            "author": {
                                "id": "https://openalex.org/A5015213736",
                                "display_name": "Armand Mattelart",
                                "orcid": null
                            },
                            "institutions": [],
                            "countries": [],
                            "is_corresponding": true,
                            "raw_author_name": "Armand Mattelart",
                            "raw_affiliation_string": "",
                            "raw_affiliation_strings": []
                        }
                    ],
                    "countries_distinct_count": 0,
                    "institutions_distinct_count": 0,
                    "corresponding_author_ids": [
                        "https://openalex.org/A5015213736"
                    ],
                    "corresponding_institution_ids": [],
                    "apc_list": null,
                    "apc_paid": null,
                    "has_fulltext": false,
                    "cited_by_count": 12,
                    "cited_by_percentile_year": {
                        "min": 96,
                        "max": 97
                    },
                    "biblio": {
                        "volume": null,
                        "issue": null,
                        "first_page": null,
                        "last_page": null
                    },
                    "is_retracted": false,
                    "is_paratext": false,
                    "keywords": [
                        {
                            "keyword": "socialist france",
                            "score": 0.5496
                        },
                        {
                            "keyword": "democracy",
                            "score": 0.4405
                        },
                        {
                            "keyword": "matching technology",
                            "score": 0.399
                        }
                    ],
                    "concepts": [
                        {
                            "id": "https://openalex.org/C555826173",
                            "wikidata": "https://www.wikidata.org/wiki/Q7174",
                            "display_name": "Democracy",
                            "level": 3,
                            "score": 0.67197883
                        },
                        {
                            "id": "https://openalex.org/C165064840",
                            "wikidata": "https://www.wikidata.org/wiki/Q1321061",
                            "display_name": "Matching (statistics)",
                            "level": 2,
                            "score": 0.6372054
                        },
                        {
                            "id": "https://openalex.org/C17744445",
                            "wikidata": "https://www.wikidata.org/wiki/Q36442",
                            "display_name": "Political science",
                            "level": 0,
                            "score": 0.47084376
                        },
                        {
                            "id": "https://openalex.org/C74363100",
                            "wikidata": "https://www.wikidata.org/wiki/Q273005",
                            "display_name": "Economic system",
                            "level": 1,
                            "score": 0.36302832
                        },
                        {
                            "id": "https://openalex.org/C162324750",
                            "wikidata": "https://www.wikidata.org/wiki/Q8134",
                            "display_name": "Economics",
                            "level": 0,
                            "score": 0.20836982
                        },
                        {
                            "id": "https://openalex.org/C33923547",
                            "wikidata": "https://www.wikidata.org/wiki/Q395",
                            "display_name": "Mathematics",
                            "level": 0,
                            "score": 0.12234047
                        },
                        {
                            "id": "https://openalex.org/C199539241",
                            "wikidata": "https://www.wikidata.org/wiki/Q7748",
                            "display_name": "Law",
                            "level": 1,
                            "score": 0.080786586
                        },
                        {
                            "id": "https://openalex.org/C105795698",
                            "wikidata": "https://www.wikidata.org/wiki/Q12483",
                            "display_name": "Statistics",
                            "level": 1,
                            "score": 0.053979874
                        },
                        {
                            "id": "https://openalex.org/C94625758",
                            "wikidata": "https://www.wikidata.org/wiki/Q7163",
                            "display_name": "Politics",
                            "level": 2,
                            "score": 0.04094225
                        }
                    ],
                    "mesh": [],
                    "locations_count": 1,
                    "locations": [
                        {
                            "is_oa": false,
                            "landing_page_url": "https://doi.org/10.1007/978-1-349-19059-1_41",
                            "pdf_url": null,
                            "source": {
                                "id": "https://openalex.org/S4306488690",
                                "display_name": "Macmillan Education UK-London eBooks",
                                "issn_l": null,
                                "issn": null,
                                "is_oa": false,
                                "is_in_doaj": false,
                                "host_organization": null,
                                "host_organization_name": null,
                                "host_organization_lineage": [],
                                "host_organization_lineage_names": [],
                                "type": "ebook platform"
                            },
                            "license": null,
                            "version": null,
                            "is_accepted": false,
                            "is_published": false
                        }
                    ],
                    "best_oa_location": null,
                    "sustainable_development_goals": [
                        {
                            "id": "https://metadata.un.org/sdg/8",
                            "display_name": "Decent work and economic growth",
                            "score": 0.29
                        },
                        {
                            "id": "https://metadata.un.org/sdg/10",
                            "display_name": "Reduced inequalities",
                            "score": 0.28
                        },
                        {
                            "id": "https://metadata.un.org/sdg/13",
                            "display_name": "Climate action",
                            "score": 0.12
                        },
                        {
                            "id": "https://metadata.un.org/sdg/17",
                            "display_name": "Partnerships for the goals",
                            "score": 0.11
                        }
                    ],
                    "grants": [],
                    "referenced_works_count": 0,
                    "referenced_works": [],
                    "related_works": [
                        "https://openalex.org/W2022432185",
                        "https://openalex.org/W2254430579",
                        "https://openalex.org/W2351459533",
                        "https://openalex.org/W2357143493",
                        "https://openalex.org/W2360125826",
                        "https://openalex.org/W2363278141",
                        "https://openalex.org/W2366903530",
                        "https://openalex.org/W2367540054",
                        "https://openalex.org/W2367973382",
                        "https://openalex.org/W2371040223",
                        "https://openalex.org/W2374698561",
                        "https://openalex.org/W2377496998",
                        "https://openalex.org/W2380530959",
                        "https://openalex.org/W2380820694",
                        "https://openalex.org/W2383591853",
                        "https://openalex.org/W2387410227",
                        "https://openalex.org/W2391130107",
                        "https://openalex.org/W2394272200",
                        "https://openalex.org/W2489558288",
                        "https://openalex.org/W3124299019"
                    ],
                    "ngrams_url": "https://api.openalex.org/works/W2483224560/ngrams",
                    "abstract_inverted_index": null,
                    "cited_by_api_url": "https://api.openalex.org/works?filter=cites:W2483224560",
                    "counts_by_year": [],
                    "updated_date": "2023-12-11T19:11:33.503378",
                    "created_date": "2016-08-23",
                    "abstract": "",
                    "2023_cited_count": 0
                },
                {
                    "id": "https://openalex.org/W2486257967",
                    "doi": "https://doi.org/10.1007/978-1-349-19059-1_6",
                    "title": null,
                    "display_name": null,
                    "publication_year": 1400,
                    "publication_date": "1400-01-01",
                    "ids": {
                        "openalex": "https://openalex.org/W2486257967",
                        "doi": "https://doi.org/10.1007/978-1-349-19059-1_6",
                        "mag": "2486257967"
                    },
                    "language": null,
                    "primary_location": {
                        "is_oa": false,
                        "landing_page_url": "https://doi.org/10.1007/978-1-349-19059-1_6",
                        "pdf_url": null,
                        "source": {
                            "id": "https://openalex.org/S4306488690",
                            "display_name": "Macmillan Education UK-London eBooks",
                            "issn_l": null,
                            "issn": null,
                            "is_oa": false,
                            "is_in_doaj": false,
                            "host_organization": null,
                            "host_organization_name": null,
                            "host_organization_lineage": [],
                            "host_organization_lineage_names": [],
                            "type": "ebook platform"
                        },
                        "license": null,
                        "version": null,
                        "is_accepted": false,
                        "is_published": false
                    },
                    "type": "book-chapter",
                    "type_crossref": "book-chapter",
                    "open_access": {
                        "is_oa": -1,
                        "oa_status": "closed",
                        "oa_url": null,
                        "any_repository_has_fulltext": false
                    },
                    "authorships": [
                        {
                            "author_position": "first",
                            "author": {
                                "id": "https://openalex.org/A5040128812",
                                "display_name": "Henri Lefebvre",
                                "orcid": "https://orcid.org/0000-0002-6181-9648"
                            },
                            "institutions": [],
                            "countries": [],
                            "is_corresponding": true,
                            "raw_author_name": "Henri Lefebvre",
                            "raw_affiliation_string": "",
                            "raw_affiliation_strings": []
                        }
                    ],
                    "countries_distinct_count": 0,
                    "institutions_distinct_count": 0,
                    "corresponding_author_ids": [
                        "https://openalex.org/A5040128812"
                    ],
                    "corresponding_institution_ids": [],
                    "apc_list": null,
                    "apc_paid": null,
                    "has_fulltext": false,
                    "cited_by_count": 60,
                    "cited_by_percentile_year": {
                        "min": 99,
                        "max": 100
                    },
                    "biblio": {
                        "volume": null,
                        "issue": null,
                        "first_page": null,
                        "last_page": null
                    },
                    "is_retracted": false,
                    "is_paratext": false,
                    "keywords": [],
                    "concepts": [
                        {
                            "id": "https://openalex.org/C41008148",
                            "wikidata": "https://www.wikidata.org/wiki/Q21198",
                            "display_name": "Computer science",
                            "level": 0,
                            "score": 0.28422686
                        }
                    ],
                    "mesh": [],
                    "locations_count": 1,
                    "locations": [
                        {
                            "is_oa": false,
                            "landing_page_url": "https://doi.org/10.1007/978-1-349-19059-1_6",
                            "pdf_url": null,
                            "source": {
                                "id": "https://openalex.org/S4306488690",
                                "display_name": "Macmillan Education UK-London eBooks",
                                "issn_l": null,
                                "issn": null,
                                "is_oa": false,
                                "is_in_doaj": false,
                                "host_organization": null,
                                "host_organization_name": null,
                                "host_organization_lineage": [],
                                "host_organization_lineage_names": [],
                                "type": "ebook platform"
                            },
                            "license": null,
                            "version": null,
                            "is_accepted": false,
                            "is_published": false
                        }
                    ],
                    "best_oa_location": null,
                    "sustainable_development_goals": [],
                    "grants": [],
                    "referenced_works_count": 0,
                    "referenced_works": [],
                    "related_works": [
                        "https://openalex.org/W422998869",
                        "https://openalex.org/W636170141",
                        "https://openalex.org/W1483339446",
                        "https://openalex.org/W1516080007",
                        "https://openalex.org/W1531661673",
                        "https://openalex.org/W1578247570",
                        "https://openalex.org/W1590678661",
                        "https://openalex.org/W1598649489",
                        "https://openalex.org/W2004597467",
                        "https://openalex.org/W2006990085",
                        "https://openalex.org/W2030087868",
                        "https://openalex.org/W2032498967",
                        "https://openalex.org/W2034769775",
                        "https://openalex.org/W2042276094",
                        "https://openalex.org/W2048375915",
                        "https://openalex.org/W2048683619",
                        "https://openalex.org/W2089029652",
                        "https://openalex.org/W2105387498",
                        "https://openalex.org/W2316739529",
                        "https://openalex.org/W2797273235"
                    ],
                    "ngrams_url": "https://api.openalex.org/works/W2486257967/ngrams",
                    "abstract_inverted_index": null,
                    "cited_by_api_url": "https://api.openalex.org/works?filter=cites:W2486257967",
                    "counts_by_year": [
                        {
                            "year": 2022,
                            "cited_by_count": 2
                        },
                        {
                            "year": 2020,
                            "cited_by_count": 3
                        },
                        {
                            "year": 2019,
                            "cited_by_count": 3
                        },
                        {
                            "year": 2018,
                            "cited_by_count": 2
                        },
                        {
                            "year": 2017,
                            "cited_by_count": 2
                        },
                        {
                            "year": 2016,
                            "cited_by_count": 4
                        },
                        {
                            "year": 2015,
                            "cited_by_count": 1
                        },
                        {
                            "year": 2014,
                            "cited_by_count": 4
                        },
                        {
                            "year": 2013,
                            "cited_by_count": 1
                        },
                        {
                            "year": 2012,
                            "cited_by_count": 3
                        }
                    ],
                    "updated_date": "2023-12-16T07:35:38.272230",
                    "created_date": "2016-08-23",
                    "abstract": "",
                    "2023_cited_count": 0
                },
                {
                    "id": "https://openalex.org/W4254916064",
                    "doi": "https://doi.org/10.1007/978-1-4899-3324-9_3",
                    "title": null,
                    "display_name": null,
                    "publication_year": 1400,
                    "publication_date": "1400-01-01",
                    "ids": {
                        "openalex": "https://openalex.org/W4254916064",
                        "doi": "https://doi.org/10.1007/978-1-4899-3324-9_3"
                    },
                    "language": null,
                    "primary_location": {
                        "is_oa": false,
                        "landing_page_url": "https://doi.org/10.1007/978-1-4899-3324-9_3",
                        "pdf_url": null,
                        "source": {
                            "id": "https://openalex.org/S4306463937",
                            "display_name": "Springer eBooks",
                            "issn_l": null,
                            "issn": null,
                            "is_oa": false,
                            "is_in_doaj": false,
                            "host_organization": null,
                            "host_organization_name": null,
                            "host_organization_lineage": [],
                            "host_organization_lineage_names": [],
                            "type": "ebook platform"
                        },
                        "license": null,
                        "version": null,
                        "is_accepted": false,
                        "is_published": false
                    },
                    "type": "book-chapter",
                    "type_crossref": "book-chapter",
                    "open_access": {
                        "is_oa": -1,
                        "oa_status": "closed",
                        "oa_url": null,
                        "any_repository_has_fulltext": false
                    },
                    "authorships": [
                        {
                            "author_position": "first",
                            "author": {
                                "id": "https://openalex.org/A5066357772",
                                "display_name": "Bernard W. Silverman",
                                "orcid": "https://orcid.org/0000-0002-4059-2376"
                            },
                            "institutions": [],
                            "countries": [],
                            "is_corresponding": true,
                            "raw_author_name": "B. W. Silverman",
                            "raw_affiliation_string": "",
                            "raw_affiliation_strings": []
                        }
                    ],
                    "countries_distinct_count": 0,
                    "institutions_distinct_count": 0,
                    "corresponding_author_ids": [
                        "https://openalex.org/A5066357772"
                    ],
                    "corresponding_institution_ids": [],
                    "apc_list": null,
                    "apc_paid": null,
                    "has_fulltext": false,
                    "cited_by_count": 25,
                    "cited_by_percentile_year": {
                        "min": 98,
                        "max": 99
                    },
                    "biblio": {
                        "volume": null,
                        "issue": null,
                        "first_page": null,
                        "last_page": null
                    },
                    "is_retracted": false,
                    "is_paratext": false,
                    "keywords": [],
                    "concepts": [
                        {
                            "id": "https://openalex.org/C41008148",
                            "wikidata": "https://www.wikidata.org/wiki/Q21198",
                            "display_name": "Computer science",
                            "level": 0,
                            "score": 0.33901423
                        }
                    ],
                    "mesh": [],
                    "locations_count": 1,
                    "locations": [
                        {
                            "is_oa": false,
                            "landing_page_url": "https://doi.org/10.1007/978-1-4899-3324-9_3",
                            "pdf_url": null,
                            "source": {
                                "id": "https://openalex.org/S4306463937",
                                "display_name": "Springer eBooks",
                                "issn_l": null,
                                "issn": null,
                                "is_oa": false,
                                "is_in_doaj": false,
                                "host_organization": null,
                                "host_organization_name": null,
                                "host_organization_lineage": [],
                                "host_organization_lineage_names": [],
                                "type": "ebook platform"
                            },
                            "license": null,
                            "version": null,
                            "is_accepted": false,
                            "is_published": false
                        }
                    ],
                    "best_oa_location": null,
                    "sustainable_development_goals": [],
                    "grants": [],
                    "referenced_works_count": 0,
                    "referenced_works": [],
                    "related_works": [
                        "https://openalex.org/W2899084033",
                        "https://openalex.org/W2748952813",
                        "https://openalex.org/W2390279801",
                        "https://openalex.org/W2358668433",
                        "https://openalex.org/W2376932109",
                        "https://openalex.org/W2382290278",
                        "https://openalex.org/W2350741829",
                        "https://openalex.org/W2130043461",
                        "https://openalex.org/W2530322880",
                        "https://openalex.org/W1596801655"
                    ],
                    "ngrams_url": "https://api.openalex.org/works/W4254916064/ngrams",
                    "abstract_inverted_index": null,
                    "cited_by_api_url": "https://api.openalex.org/works?filter=cites:W4254916064",
                    "counts_by_year": [
                        {
                            "year": 2022,
                            "cited_by_count": 1
                        },
                        {
                            "year": 2021,
                            "cited_by_count": 1
                        },
                        {
                            "year": 2020,
                            "cited_by_count": 1
                        },
                        {
                            "year": 2019,
                            "cited_by_count": 4
                        },
                        {
                            "year": 2017,
                            "cited_by_count": 2
                        },
                        {
                            "year": 2016,
                            "cited_by_count": 4
                        },
                        {
                            "year": 2015,
                            "cited_by_count": 1
                        },
                        {
                            "year": 2014,
                            "cited_by_count": 1
                        },
                        {
                            "year": 2013,
                            "cited_by_count": 2
                        },
                        {
                            "year": 2012,
                            "cited_by_count": 2
                        }
                    ],
                    "updated_date": "2023-12-11T20:50:30.867030",
                    "created_date": "2022-05-12",
                    "abstract": "",
                    "2023_cited_count": 0
                },
                {
                    "id": "https://openalex.org/W2506790347",
                    "doi": "https://doi.org/10.1007/978-1-349-19059-1_32",
                    "title": "The “New Song” and Its Confrontation in Latin America",
                    "display_name": "The “New Song” and Its Confrontation in Latin America",
                    "publication_year": 1400,
                    "publication_date": "1400-01-01",
                    "ids": {
                        "openalex": "https://openalex.org/W2506790347",
                        "doi": "https://doi.org/10.1007/978-1-349-19059-1_32",
                        "mag": "2506790347"
                    },
                    "language": "en",
                    "primary_location": {
                        "is_oa": false,
                        "landing_page_url": "https://doi.org/10.1007/978-1-349-19059-1_32",
                        "pdf_url": null,
                        "source": {
                            "id": "https://openalex.org/S4306488690",
                            "display_name": "Macmillan Education UK-London eBooks",
                            "issn_l": null,
                            "issn": null,
                            "is_oa": false,
                            "is_in_doaj": false,
                            "host_organization": null,
                            "host_organization_name": null,
                            "host_organization_lineage": [],
                            "host_organization_lineage_names": [],
                            "type": "ebook platform"
                        },
                        "license": null,
                        "version": null,
                        "is_accepted": false,
                        "is_published": false
                    },
                    "type": "book-chapter",
                    "type_crossref": "book-chapter",
                    "open_access": {
                        "is_oa": -1,
                        "oa_status": "closed",
                        "oa_url": null,
                        "any_repository_has_fulltext": false
                    },
                    "authorships": [
                        {
                            "author_position": "first",
                            "author": {
                                "id": "https://openalex.org/A5050443656",
                                "display_name": "Fernando Reyes Matta",
                                "orcid": null
                            },
                            "institutions": [],
                            "countries": [],
                            "is_corresponding": true,
                            "raw_author_name": "Fernando Reyes Matta",
                            "raw_affiliation_string": "",
                            "raw_affiliation_strings": []
                        }
                    ],
                    "countries_distinct_count": 0,
                    "institutions_distinct_count": 0,
                    "corresponding_author_ids": [
                        "https://openalex.org/A5050443656"
                    ],
                    "corresponding_institution_ids": [],
                    "apc_list": null,
                    "apc_paid": null,
                    "has_fulltext": false,
                    "cited_by_count": 24,
                    "cited_by_percentile_year": {
                        "min": 98,
                        "max": 99
                    },
                    "biblio": {
                        "volume": null,
                        "issue": null,
                        "first_page": null,
                        "last_page": null
                    },
                    "is_retracted": false,
                    "is_paratext": false,
                    "keywords": [
                        {
                            "keyword": "latin america",
                            "score": 0.6119
                        },
                        {
                            "keyword": "new song”",
                            "score": 0.4962
                        }
                    ],
                    "concepts": [
                        {
                            "id": "https://openalex.org/C158886217",
                            "wikidata": "https://www.wikidata.org/wiki/Q16799549",
                            "display_name": "Latin Americans",
                            "level": 2,
                            "score": 0.4985535
                        },
                        {
                            "id": "https://openalex.org/C95457728",
                            "wikidata": "https://www.wikidata.org/wiki/Q309",
                            "display_name": "History",
                            "level": 0,
                            "score": 0.44691616
                        },
                        {
                            "id": "https://openalex.org/C17744445",
                            "wikidata": "https://www.wikidata.org/wiki/Q36442",
                            "display_name": "Political science",
                            "level": 0,
                            "score": 0.32863736
                        },
                        {
                            "id": "https://openalex.org/C199539241",
                            "wikidata": "https://www.wikidata.org/wiki/Q7748",
                            "display_name": "Law",
                            "level": 1,
                            "score": 0.114654094
                        }
                    ],
                    "mesh": [],
                    "locations_count": 1,
                    "locations": [
                        {
                            "is_oa": false,
                            "landing_page_url": "https://doi.org/10.1007/978-1-349-19059-1_32",
                            "pdf_url": null,
                            "source": {
                                "id": "https://openalex.org/S4306488690",
                                "display_name": "Macmillan Education UK-London eBooks",
                                "issn_l": null,
                                "issn": null,
                                "is_oa": false,
                                "is_in_doaj": false,
                                "host_organization": null,
                                "host_organization_name": null,
                                "host_organization_lineage": [],
                                "host_organization_lineage_names": [],
                                "type": "ebook platform"
                            },
                            "license": null,
                            "version": null,
                            "is_accepted": false,
                            "is_published": false
                        }
                    ],
                    "best_oa_location": null,
                    "sustainable_development_goals": [
                        {
                            "id": "https://metadata.un.org/sdg/10",
                            "display_name": "Reduced inequalities",
                            "score": 0.45
                        },
                        {
                            "id": "https://metadata.un.org/sdg/5",
                            "display_name": "Gender equality",
                            "score": 0.29
                        },
                        {
                            "id": "https://metadata.un.org/sdg/8",
                            "display_name": "Decent work and economic growth",
                            "score": 0.25
                        },
                        {
                            "id": "https://metadata.un.org/sdg/2",
                            "display_name": "Zero hunger",
                            "score": 0.12
                        },
                        {
                            "id": "https://metadata.un.org/sdg/13",
                            "display_name": "Climate action",
                            "score": 0.11
                        }
                    ],
                    "grants": [],
                    "referenced_works_count": 0,
                    "referenced_works": [],
                    "related_works": [
                        "https://openalex.org/W159124704",
                        "https://openalex.org/W207818767",
                        "https://openalex.org/W574225335",
                        "https://openalex.org/W582198748",
                        "https://openalex.org/W602068754",
                        "https://openalex.org/W613531881",
                        "https://openalex.org/W1549950756",
                        "https://openalex.org/W1997173003",
                        "https://openalex.org/W2004597467",
                        "https://openalex.org/W2029139767",
                        "https://openalex.org/W2051191602",
                        "https://openalex.org/W2321571818",
                        "https://openalex.org/W2322671593",
                        "https://openalex.org/W2327168126",
                        "https://openalex.org/W2331710705",
                        "https://openalex.org/W2613196149",
                        "https://openalex.org/W2799223534",
                        "https://openalex.org/W2890902914",
                        "https://openalex.org/W2938500670",
                        "https://openalex.org/W2978626892"
                    ],
                    "ngrams_url": "https://api.openalex.org/works/W2506790347/ngrams",
                    "abstract_inverted_index": null,
                    "cited_by_api_url": "https://api.openalex.org/works?filter=cites:W2506790347",
                    "counts_by_year": [
                        {
                            "year": 2018,
                            "cited_by_count": 8
                        },
                        {
                            "year": 2016,
                            "cited_by_count": 2
                        },
                        {
                            "year": 2015,
                            "cited_by_count": 1
                        },
                        {
                            "year": 2014,
                            "cited_by_count": 2
                        },
                        {
                            "year": 2013,
                            "cited_by_count": 1
                        },
                        {
                            "year": 2012,
                            "cited_by_count": 1
                        }
                    ],
                    "updated_date": "2023-12-15T02:34:19.244480",
                    "created_date": "2016-08-23",
                    "abstract": "",
                    "2023_cited_count": 0
                },
                {
                    "id": "https://openalex.org/W2481363925",
                    "doi": "https://doi.org/10.1007/978-1-349-19059-1_11",
                    "title": null,
                    "display_name": null,
                    "publication_year": 1400,
                    "publication_date": "1400-01-01",
                    "ids": {
                        "openalex": "https://openalex.org/W2481363925",
                        "doi": "https://doi.org/10.1007/978-1-349-19059-1_11",
                        "mag": "2481363925"
                    },
                    "language": null,
                    "primary_location": {
                        "is_oa": false,
                        "landing_page_url": "https://doi.org/10.1007/978-1-349-19059-1_11",
                        "pdf_url": null,
                        "source": {
                            "id": "https://openalex.org/S4306488690",
                            "display_name": "Macmillan Education UK-London eBooks",
                            "issn_l": null,
                            "issn": null,
                            "is_oa": false,
                            "is_in_doaj": false,
                            "host_organization": null,
                            "host_organization_name": null,
                            "host_organization_lineage": [],
                            "host_organization_lineage_names": [],
                            "type": "ebook platform"
                        },
                        "license": null,
                        "version": null,
                        "is_accepted": false,
                        "is_published": false
                    },
                    "type": "book-chapter",
                    "type_crossref": "book-chapter",
                    "open_access": {
                        "is_oa": -1,
                        "oa_status": "closed",
                        "oa_url": null,
                        "any_repository_has_fulltext": false
                    },
                    "authorships": [
                        {
                            "author_position": "first",
                            "author": {
                                "id": "https://openalex.org/A5042110741",
                                "display_name": "Paul Patton",
                                "orcid": null
                            },
                            "institutions": [],
                            "countries": [],
                            "is_corresponding": true,
                            "raw_author_name": "Paul Patton",
                            "raw_affiliation_string": "",
                            "raw_affiliation_strings": []
                        }
                    ],
                    "countries_distinct_count": 0,
                    "institutions_distinct_count": 0,
                    "corresponding_author_ids": [
                        "https://openalex.org/A5042110741"
                    ],
                    "corresponding_institution_ids": [],
                    "apc_list": null,
                    "apc_paid": null,
                    "has_fulltext": false,
                    "cited_by_count": 14,
                    "cited_by_percentile_year": {
                        "min": 97,
                        "max": 98
                    },
                    "biblio": {
                        "volume": null,
                        "issue": null,
                        "first_page": null,
                        "last_page": null
                    },
                    "is_retracted": false,
                    "is_paratext": false,
                    "keywords": [
                        {
                            "keyword": "reterritorialization",
                            "score": 0.7855
                        },
                        {
                            "keyword": "marxism",
                            "score": 0.5514
                        },
                        {
                            "keyword": "strategies",
                            "score": 0.2819
                        }
                    ],
                    "concepts": [
                        {
                            "id": "https://openalex.org/C71924100",
                            "wikidata": "https://www.wikidata.org/wiki/Q11190",
                            "display_name": "Medicine",
                            "level": 0,
                            "score": 0.25706017
                        }
                    ],
                    "mesh": [],
                    "locations_count": 1,
                    "locations": [
                        {
                            "is_oa": false,
                            "landing_page_url": "https://doi.org/10.1007/978-1-349-19059-1_11",
                            "pdf_url": null,
                            "source": {
                                "id": "https://openalex.org/S4306488690",
                                "display_name": "Macmillan Education UK-London eBooks",
                                "issn_l": null,
                                "issn": null,
                                "is_oa": false,
                                "is_in_doaj": false,
                                "host_organization": null,
                                "host_organization_name": null,
                                "host_organization_lineage": [],
                                "host_organization_lineage_names": [],
                                "type": "ebook platform"
                            },
                            "license": null,
                            "version": null,
                            "is_accepted": false,
                            "is_published": false
                        }
                    ],
                    "best_oa_location": null,
                    "sustainable_development_goals": [
                        {
                            "id": "https://metadata.un.org/sdg/10",
                            "display_name": "Reduced inequalities",
                            "score": 0.68
                        }
                    ],
                    "grants": [],
                    "referenced_works_count": 0,
                    "referenced_works": [],
                    "related_works": [
                        "https://openalex.org/W794710523",
                        "https://openalex.org/W2084621397",
                        "https://openalex.org/W2196904584",
                        "https://openalex.org/W2345973768",
                        "https://openalex.org/W2390291928",
                        "https://openalex.org/W2769360399"
                    ],
                    "ngrams_url": "https://api.openalex.org/works/W2481363925/ngrams",
                    "abstract_inverted_index": null,
                    "cited_by_api_url": "https://api.openalex.org/works?filter=cites:W2481363925",
                    "counts_by_year": [
                        {
                            "year": 2020,
                            "cited_by_count": 1
                        },
                        {
                            "year": 2019,
                            "cited_by_count": 1
                        },
                        {
                            "year": 2017,
                            "cited_by_count": 1
                        }
                    ],
                    "updated_date": "2023-12-10T04:13:28.921486",
                    "created_date": "2016-08-23",
                    "abstract": "",
                    "2023_cited_count": 0
                },
                {
                    "id": "https://openalex.org/W4233014035",
                    "doi": "https://doi.org/10.1007/978-1-4899-3324-9",
                    "title": "Density Estimation for Statistics and Data Analysis",
                    "display_name": "Density Estimation for Statistics and Data Analysis",
                    "publication_year": 1400,
                    "publication_date": "1400-01-01",
                    "ids": {
                        "openalex": "https://openalex.org/W4233014035",
                        "doi": "https://doi.org/10.1007/978-1-4899-3324-9"
                    },
                    "language": "en",
                    "primary_location": {
                        "is_oa": false,
                        "landing_page_url": "https://doi.org/10.1007/978-1-4899-3324-9",
                        "pdf_url": null,
                        "source": {
                            "id": "https://openalex.org/S4306463937",
                            "display_name": "Springer eBooks",
                            "issn_l": null,
                            "issn": null,
                            "is_oa": false,
                            "is_in_doaj": false,
                            "host_organization": null,
                            "host_organization_name": null,
                            "host_organization_lineage": [],
                            "host_organization_lineage_names": [],
                            "type": "ebook platform"
                        },
                        "license": null,
                        "version": null,
                        "is_accepted": false,
                        "is_published": false
                    },
                    "type": "book",
                    "type_crossref": "book",
                    "open_access": {
                        "is_oa": -1,
                        "oa_status": "closed",
                        "oa_url": null,
                        "any_repository_has_fulltext": false
                    },
                    "authorships": [],
                    "countries_distinct_count": 0,
                    "institutions_distinct_count": 0,
                    "corresponding_author_ids": [],
                    "corresponding_institution_ids": [],
                    "apc_list": null,
                    "apc_paid": null,
                    "has_fulltext": false,
                    "cited_by_count": 7989,
                    "cited_by_percentile_year": null,
                    "biblio": {
                        "volume": null,
                        "issue": null,
                        "first_page": null,
                        "last_page": null
                    },
                    "is_retracted": false,
                    "is_paratext": false,
                    "keywords": [
                        {
                            "keyword": "density",
                            "score": 0.5308
                        },
                        {
                            "keyword": "estimation",
                            "score": 0.5257
                        },
                        {
                            "keyword": "statistics",
                            "score": 0.4691
                        },
                        {
                            "keyword": "analysis",
                            "score": 0.3333
                        },
                        {
                            "keyword": "data",
                            "score": 0.3237
                        }
                    ],
                    "concepts": [
                        {
                            "id": "https://openalex.org/C105795698",
                            "wikidata": "https://www.wikidata.org/wiki/Q12483",
                            "display_name": "Statistics",
                            "level": 1,
                            "score": 0.62811273
                        },
                        {
                            "id": "https://openalex.org/C96250715",
                            "wikidata": "https://www.wikidata.org/wiki/Q965330",
                            "display_name": "Estimation",
                            "level": 2,
                            "score": 0.5468091
                        },
                        {
                            "id": "https://openalex.org/C41008148",
                            "wikidata": "https://www.wikidata.org/wiki/Q21198",
                            "display_name": "Computer science",
                            "level": 0,
                            "score": 0.39374238
                        },
                        {
                            "id": "https://openalex.org/C149782125",
                            "wikidata": "https://www.wikidata.org/wiki/Q160039",
                            "display_name": "Econometrics",
                            "level": 1,
                            "score": 0.36592126
                        },
                        {
                            "id": "https://openalex.org/C33923547",
                            "wikidata": "https://www.wikidata.org/wiki/Q395",
                            "display_name": "Mathematics",
                            "level": 0,
                            "score": 0.23736319
                        },
                        {
                            "id": "https://openalex.org/C127413603",
                            "wikidata": "https://www.wikidata.org/wiki/Q11023",
                            "display_name": "Engineering",
                            "level": 0,
                            "score": 0.12302616
                        },
                        {
                            "id": "https://openalex.org/C201995342",
                            "wikidata": "https://www.wikidata.org/wiki/Q682496",
                            "display_name": "Systems engineering",
                            "level": 1,
                            "score": 0.0
                        }
                    ],
                    "mesh": [],
                    "locations_count": 1,
                    "locations": [
                        {
                            "is_oa": false,
                            "landing_page_url": "https://doi.org/10.1007/978-1-4899-3324-9",
                            "pdf_url": null,
                            "source": {
                                "id": "https://openalex.org/S4306463937",
                                "display_name": "Springer eBooks",
                                "issn_l": null,
                                "issn": null,
                                "is_oa": false,
                                "is_in_doaj": false,
                                "host_organization": null,
                                "host_organization_name": null,
                                "host_organization_lineage": [],
                                "host_organization_lineage_names": [],
                                "type": "ebook platform"
                            },
                            "license": null,
                            "version": null,
                            "is_accepted": false,
                            "is_published": false
                        }
                    ],
                    "best_oa_location": null,
                    "sustainable_development_goals": [
                        {
                            "id": "https://metadata.un.org/sdg/13",
                            "display_name": "Climate action",
                            "score": 0.33
                        }
                    ],
                    "grants": [],
                    "referenced_works_count": 0,
                    "referenced_works": [],
                    "related_works": [
                        "https://openalex.org/W2899084033",
                        "https://openalex.org/W2748952813",
                        "https://openalex.org/W2390279801",
                        "https://openalex.org/W2358668433",
                        "https://openalex.org/W2376932109",
                        "https://openalex.org/W2382290278",
                        "https://openalex.org/W2350741829",
                        "https://openalex.org/W2130043461",
                        "https://openalex.org/W2530322880",
                        "https://openalex.org/W1596801655"
                    ],
                    "ngrams_url": "https://api.openalex.org/works/W4233014035/ngrams",
                    "abstract_inverted_index": null,
                    "cited_by_api_url": "https://api.openalex.org/works?filter=cites:W4233014035",
                    "counts_by_year": [
                        {
                            "year": 2023,
                            "cited_by_count": 80
                        },
                        {
                            "year": 2022,
                            "cited_by_count": 94
                        },
                        {
                            "year": 2021,
                            "cited_by_count": 304
                        },
                        {
                            "year": 2020,
                            "cited_by_count": 378
                        },
                        {
                            "year": 2019,
                            "cited_by_count": 397
                        },
                        {
                            "year": 2018,
                            "cited_by_count": 451
                        },
                        {
                            "year": 2017,
                            "cited_by_count": 448
                        },
                        {
                            "year": 2016,
                            "cited_by_count": 388
                        },
                        {
                            "year": 2015,
                            "cited_by_count": 418
                        },
                        {
                            "year": 2014,
                            "cited_by_count": 475
                        },
                        {
                            "year": 2013,
                            "cited_by_count": 386
                        },
                        {
                            "year": 2012,
                            "cited_by_count": 331
                        }
                    ],
                    "updated_date": "2023-12-14T10:48:03.116251",
                    "created_date": "2022-05-12",
                    "abstract": "",
                    "2023_cited_count": 80
                },
                {
                    "id": "https://openalex.org/W2503896948",
                    "doi": "https://doi.org/10.1007/978-1-349-19059-1_45",
                    "title": null,
                    "display_name": null,
                    "publication_year": 1400,
                    "publication_date": "1400-01-01",
                    "ids": {
                        "openalex": "https://openalex.org/W2503896948",
                        "doi": "https://doi.org/10.1007/978-1-349-19059-1_45",
                        "mag": "2503896948"
                    },
                    "language": null,
                    "primary_location": {
                        "is_oa": false,
                        "landing_page_url": "https://doi.org/10.1007/978-1-349-19059-1_45",
                        "pdf_url": null,
                        "source": {
                            "id": "https://openalex.org/S4306488690",
                            "display_name": "Macmillan Education UK-London eBooks",
                            "issn_l": null,
                            "issn": null,
                            "is_oa": false,
                            "is_in_doaj": false,
                            "host_organization": null,
                            "host_organization_name": null,
                            "host_organization_lineage": [],
                            "host_organization_lineage_names": [],
                            "type": "ebook platform"
                        },
                        "license": null,
                        "version": null,
                        "is_accepted": false,
                        "is_published": false
                    },
                    "type": "book-chapter",
                    "type_crossref": "book-chapter",
                    "open_access": {
                        "is_oa": -1,
                        "oa_status": "closed",
                        "oa_url": null,
                        "any_repository_has_fulltext": false
                    },
                    "authorships": [
                        {
                            "author_position": "first",
                            "author": {
                                "id": "https://openalex.org/A5047149840",
                                "display_name": "Michel Pêcheux",
                                "orcid": null
                            },
                            "institutions": [],
                            "countries": [],
                            "is_corresponding": true,
                            "raw_author_name": "Michel Pêcheux",
                            "raw_affiliation_string": "",
                            "raw_affiliation_strings": []
                        }
                    ],
                    "countries_distinct_count": 0,
                    "institutions_distinct_count": 0,
                    "corresponding_author_ids": [
                        "https://openalex.org/A5047149840"
                    ],
                    "corresponding_institution_ids": [],
                    "apc_list": null,
                    "apc_paid": null,
                    "has_fulltext": false,
                    "cited_by_count": 23,
                    "cited_by_percentile_year": {
                        "min": 98,
                        "max": 99
                    },
                    "biblio": {
                        "volume": null,
                        "issue": null,
                        "first_page": null,
                        "last_page": null
                    },
                    "is_retracted": false,
                    "is_paratext": false,
                    "keywords": [],
                    "concepts": [
                        {
                            "id": "https://openalex.org/C138885662",
                            "wikidata": "https://www.wikidata.org/wiki/Q5891",
                            "display_name": "Philosophy",
                            "level": 0,
                            "score": 0.31462055
                        }
                    ],
                    "mesh": [],
                    "locations_count": 1,
                    "locations": [
                        {
                            "is_oa": false,
                            "landing_page_url": "https://doi.org/10.1007/978-1-349-19059-1_45",
                            "pdf_url": null,
                            "source": {
                                "id": "https://openalex.org/S4306488690",
                                "display_name": "Macmillan Education UK-London eBooks",
                                "issn_l": null,
                                "issn": null,
                                "is_oa": false,
                                "is_in_doaj": false,
                                "host_organization": null,
                                "host_organization_name": null,
                                "host_organization_lineage": [],
                                "host_organization_lineage_names": [],
                                "type": "ebook platform"
                            },
                            "license": null,
                            "version": null,
                            "is_accepted": false,
                            "is_published": false
                        }
                    ],
                    "best_oa_location": null,
                    "sustainable_development_goals": [],
                    "grants": [],
                    "referenced_works_count": 0,
                    "referenced_works": [],
                    "related_works": [
                        "https://openalex.org/W2227612306",
                        "https://openalex.org/W2912137438",
                        "https://openalex.org/W2803307177",
                        "https://openalex.org/W1494974852",
                        "https://openalex.org/W1030430500",
                        "https://openalex.org/W2346533055",
                        "https://openalex.org/W3214635344",
                        "https://openalex.org/W3166162583",
                        "https://openalex.org/W2899084033",
                        "https://openalex.org/W2748952813"
                    ],
                    "ngrams_url": "https://api.openalex.org/works/W2503896948/ngrams",
                    "abstract_inverted_index": null,
                    "cited_by_api_url": "https://api.openalex.org/works?filter=cites:W2503896948",
                    "counts_by_year": [
                        {
                            "year": 2022,
                            "cited_by_count": 1
                        },
                        {
                            "year": 2018,
                            "cited_by_count": 1
                        },
                        {
                            "year": 2013,
                            "cited_by_count": 1
                        },
                        {
                            "year": 2012,
                            "cited_by_count": 1
                        }
                    ],
                    "updated_date": "2023-12-17T09:53:07.377771",
                    "created_date": "2016-08-23",
                    "abstract": "",
                    "2023_cited_count": 0
                },
                {
                    "id": "https://openalex.org/W2482471099",
                    "doi": "https://doi.org/10.1007/978-1-349-19059-1_28",
                    "title": null,
                    "display_name": null,
                    "publication_year": 1400,
                    "publication_date": "1400-01-01",
                    "ids": {
                        "openalex": "https://openalex.org/W2482471099",
                        "doi": "https://doi.org/10.1007/978-1-349-19059-1_28",
                        "mag": "2482471099"
                    },
                    "language": null,
                    "primary_location": {
                        "is_oa": false,
                        "landing_page_url": "https://doi.org/10.1007/978-1-349-19059-1_28",
                        "pdf_url": null,
                        "source": {
                            "id": "https://openalex.org/S4306488690",
                            "display_name": "Macmillan Education UK-London eBooks",
                            "issn_l": null,
                            "issn": null,
                            "is_oa": false,
                            "is_in_doaj": false,
                            "host_organization": null,
                            "host_organization_name": null,
                            "host_organization_lineage": [],
                            "host_organization_lineage_names": [],
                            "type": "ebook platform"
                        },
                        "license": null,
                        "version": null,
                        "is_accepted": false,
                        "is_published": false
                    },
                    "type": "book-chapter",
                    "type_crossref": "book-chapter",
                    "open_access": {
                        "is_oa": -1,
                        "oa_status": "closed",
                        "oa_url": null,
                        "any_repository_has_fulltext": false
                    },
                    "authorships": [
                        {
                            "author_position": "first",
                            "author": {
                                "id": "https://openalex.org/A5020111819",
                                "display_name": "Fred Pfeil",
                                "orcid": null
                            },
                            "institutions": [],
                            "countries": [],
                            "is_corresponding": true,
                            "raw_author_name": "Fred Pfeil",
                            "raw_affiliation_string": "",
                            "raw_affiliation_strings": []
                        }
                    ],
                    "countries_distinct_count": 0,
                    "institutions_distinct_count": 0,
                    "corresponding_author_ids": [
                        "https://openalex.org/A5020111819"
                    ],
                    "corresponding_institution_ids": [],
                    "apc_list": null,
                    "apc_paid": null,
                    "has_fulltext": false,
                    "cited_by_count": 51,
                    "cited_by_percentile_year": {
                        "min": 99,
                        "max": 100
                    },
                    "biblio": {
                        "volume": null,
                        "issue": null,
                        "first_page": null,
                        "last_page": null
                    },
                    "is_retracted": false,
                    "is_paratext": false,
                    "keywords": [],
                    "concepts": [
                        {
                            "id": "https://openalex.org/C205649164",
                            "wikidata": "https://www.wikidata.org/wiki/Q1071",
                            "display_name": "Geography",
                            "level": 0,
                            "score": 0.29583135
                        }
                    ],
                    "mesh": [],
                    "locations_count": 1,
                    "locations": [
                        {
                            "is_oa": false,
                            "landing_page_url": "https://doi.org/10.1007/978-1-349-19059-1_28",
                            "pdf_url": null,
                            "source": {
                                "id": "https://openalex.org/S4306488690",
                                "display_name": "Macmillan Education UK-London eBooks",
                                "issn_l": null,
                                "issn": null,
                                "is_oa": false,
                                "is_in_doaj": false,
                                "host_organization": null,
                                "host_organization_name": null,
                                "host_organization_lineage": [],
                                "host_organization_lineage_names": [],
                                "type": "ebook platform"
                            },
                            "license": null,
                            "version": null,
                            "is_accepted": false,
                            "is_published": false
                        }
                    ],
                    "best_oa_location": null,
                    "sustainable_development_goals": [],
                    "grants": [],
                    "referenced_works_count": 0,
                    "referenced_works": [],
                    "related_works": [
                        "https://openalex.org/W1533200881",
                        "https://openalex.org/W1570770032",
                        "https://openalex.org/W1984645963",
                        "https://openalex.org/W2004597467",
                        "https://openalex.org/W2033303246",
                        "https://openalex.org/W2344994591",
                        "https://openalex.org/W2418277414",
                        "https://openalex.org/W2483480289",
                        "https://openalex.org/W2485135700",
                        "https://openalex.org/W2495609814",
                        "https://openalex.org/W2497103235",
                        "https://openalex.org/W2502230538",
                        "https://openalex.org/W2521126241",
                        "https://openalex.org/W2905407741",
                        "https://openalex.org/W3034334299"
                    ],
                    "ngrams_url": "https://api.openalex.org/works/W2482471099/ngrams",
                    "abstract_inverted_index": null,
                    "cited_by_api_url": "https://api.openalex.org/works?filter=cites:W2482471099",
                    "counts_by_year": [
                        {
                            "year": 2016,
                            "cited_by_count": 4
                        },
                        {
                            "year": 2015,
                            "cited_by_count": 1
                        },
                        {
                            "year": 2013,
                            "cited_by_count": 1
                        },
                        {
                            "year": 2012,
                            "cited_by_count": 1
                        }
                    ],
                    "updated_date": "2023-12-16T17:31:45.075680",
                    "created_date": "2016-08-23",
                    "abstract": "",
                    "2023_cited_count": 0
                },
                {
                    "id": "https://openalex.org/W2499794377",
                    "doi": "https://doi.org/10.1007/978-1-349-19059-1_36",
                    "title": "Beyond Ethnocentrism: Gender, Power, and the Third-World Intelligentsia",
                    "display_name": "Beyond Ethnocentrism: Gender, Power, and the Third-World Intelligentsia",
                    "publication_year": 1400,
                    "publication_date": "1400-01-01",
                    "ids": {
                        "openalex": "https://openalex.org/W2499794377",
                        "doi": "https://doi.org/10.1007/978-1-349-19059-1_36",
                        "mag": "2499794377"
                    },
                    "language": "en",
                    "primary_location": {
                        "is_oa": false,
                        "landing_page_url": "https://doi.org/10.1007/978-1-349-19059-1_36",
                        "pdf_url": null,
                        "source": {
                            "id": "https://openalex.org/S4306488690",
                            "display_name": "Macmillan Education UK-London eBooks",
                            "issn_l": null,
                            "issn": null,
                            "is_oa": false,
                            "is_in_doaj": false,
                            "host_organization": null,
                            "host_organization_name": null,
                            "host_organization_lineage": [],
                            "host_organization_lineage_names": [],
                            "type": "ebook platform"
                        },
                        "license": null,
                        "version": null,
                        "is_accepted": false,
                        "is_published": false
                    },
                    "type": "book-chapter",
                    "type_crossref": "book-chapter",
                    "open_access": {
                        "is_oa": -1,
                        "oa_status": "closed",
                        "oa_url": null,
                        "any_repository_has_fulltext": false
                    },
                    "authorships": [
                        {
                            "author_position": "first",
                            "author": {
                                "id": "https://openalex.org/A5034283666",
                                "display_name": "Jean Franco",
                                "orcid": "https://orcid.org/0009-0008-8111-6641"
                            },
                            "institutions": [],
                            "countries": [],
                            "is_corresponding": true,
                            "raw_author_name": "Jean Franco",
                            "raw_affiliation_string": "",
                            "raw_affiliation_strings": []
                        }
                    ],
                    "countries_distinct_count": 0,
                    "institutions_distinct_count": 0,
                    "corresponding_author_ids": [
                        "https://openalex.org/A5034283666"
                    ],
                    "corresponding_institution_ids": [],
                    "apc_list": null,
                    "apc_paid": null,
                    "has_fulltext": false,
                    "cited_by_count": 104,
                    "cited_by_percentile_year": {
                        "min": 99,
                        "max": 100
                    },
                    "biblio": {
                        "volume": null,
                        "issue": null,
                        "first_page": null,
                        "last_page": null
                    },
                    "is_retracted": false,
                    "is_paratext": false,
                    "keywords": [
                        {
                            "keyword": "intelligentsia",
                            "score": 0.5865
                        },
                        {
                            "keyword": "ethnocentrism",
                            "score": 0.5512
                        },
                        {
                            "keyword": "gender",
                            "score": 0.4381
                        },
                        {
                            "keyword": "third-world",
                            "score": 0.25
                        }
                    ],
                    "concepts": [
                        {
                            "id": "https://openalex.org/C2776129495",
                            "wikidata": "https://www.wikidata.org/wiki/Q381142",
                            "display_name": "Intelligentsia",
                            "level": 3,
                            "score": 0.94217086
                        },
                        {
                            "id": "https://openalex.org/C122445209",
                            "wikidata": "https://www.wikidata.org/wiki/Q189049",
                            "display_name": "Ethnocentrism",
                            "level": 2,
                            "score": 0.84902614
                        },
                        {
                            "id": "https://openalex.org/C163258240",
                            "wikidata": "https://www.wikidata.org/wiki/Q25342",
                            "display_name": "Power (physics)",
                            "level": 2,
                            "score": 0.6217026
                        },
                        {
                            "id": "https://openalex.org/C17744445",
                            "wikidata": "https://www.wikidata.org/wiki/Q36442",
                            "display_name": "Political science",
                            "level": 0,
                            "score": 0.35784426
                        },
                        {
                            "id": "https://openalex.org/C15744967",
                            "wikidata": "https://www.wikidata.org/wiki/Q9418",
                            "display_name": "Psychology",
                            "level": 0,
                            "score": 0.3265453
                        },
                        {
                            "id": "https://openalex.org/C77805123",
                            "wikidata": "https://www.wikidata.org/wiki/Q161272",
                            "display_name": "Social psychology",
                            "level": 1,
                            "score": 0.31908804
                        },
                        {
                            "id": "https://openalex.org/C94625758",
                            "wikidata": "https://www.wikidata.org/wiki/Q7163",
                            "display_name": "Politics",
                            "level": 2,
                            "score": 0.12118667
                        },
                        {
                            "id": "https://openalex.org/C199539241",
                            "wikidata": "https://www.wikidata.org/wiki/Q7748",
                            "display_name": "Law",
                            "level": 1,
                            "score": 0.08446953
                        },
                        {
                            "id": "https://openalex.org/C121332964",
                            "wikidata": "https://www.wikidata.org/wiki/Q413",
                            "display_name": "Physics",
                            "level": 0,
                            "score": 0.069310516
                        },
                        {
                            "id": "https://openalex.org/C62520636",
                            "wikidata": "https://www.wikidata.org/wiki/Q944",
                            "display_name": "Quantum mechanics",
                            "level": 1,
                            "score": 0.0
                        }
                    ],
                    "mesh": [],
                    "locations_count": 1,
                    "locations": [
                        {
                            "is_oa": false,
                            "landing_page_url": "https://doi.org/10.1007/978-1-349-19059-1_36",
                            "pdf_url": null,
                            "source": {
                                "id": "https://openalex.org/S4306488690",
                                "display_name": "Macmillan Education UK-London eBooks",
                                "issn_l": null,
                                "issn": null,
                                "is_oa": false,
                                "is_in_doaj": false,
                                "host_organization": null,
                                "host_organization_name": null,
                                "host_organization_lineage": [],
                                "host_organization_lineage_names": [],
                                "type": "ebook platform"
                            },
                            "license": null,
                            "version": null,
                            "is_accepted": false,
                            "is_published": false
                        }
                    ],
                    "best_oa_location": null,
                    "sustainable_development_goals": [
                        {
                            "id": "https://metadata.un.org/sdg/5",
                            "display_name": "Gender equality",
                            "score": 0.64
                        }
                    ],
                    "grants": [],
                    "referenced_works_count": 0,
                    "referenced_works": [],
                    "related_works": [
                        "https://openalex.org/W1485995441",
                        "https://openalex.org/W1544183326",
                        "https://openalex.org/W1557068097",
                        "https://openalex.org/W1602491286",
                        "https://openalex.org/W1807338934",
                        "https://openalex.org/W1966303814",
                        "https://openalex.org/W1969114711",
                        "https://openalex.org/W1984645963",
                        "https://openalex.org/W1992976398",
                        "https://openalex.org/W1994266887",
                        "https://openalex.org/W2002629024",
                        "https://openalex.org/W2004038836",
                        "https://openalex.org/W2016670623",
                        "https://openalex.org/W2017802748",
                        "https://openalex.org/W2018647184",
                        "https://openalex.org/W2020735022",
                        "https://openalex.org/W2022655337",
                        "https://openalex.org/W2027941220",
                        "https://openalex.org/W2033510168",
                        "https://openalex.org/W2067562289"
                    ],
                    "ngrams_url": "https://api.openalex.org/works/W2499794377/ngrams",
                    "abstract_inverted_index": null,
                    "cited_by_api_url": "https://api.openalex.org/works?filter=cites:W2499794377",
                    "counts_by_year": [
                        {
                            "year": 2020,
                            "cited_by_count": 1
                        },
                        {
                            "year": 2016,
                            "cited_by_count": 2
                        },
                        {
                            "year": 2015,
                            "cited_by_count": 1
                        },
                        {
                            "year": 2014,
                            "cited_by_count": 1
                        },
                        {
                            "year": 2012,
                            "cited_by_count": 1
                        }
                    ],
                    "updated_date": "2023-12-14T05:01:38.927932",
                    "created_date": "2016-08-23",
                    "abstract": "",
                    "2023_cited_count": 0
                },
                {
                    "id": "https://openalex.org/W2496949965",
                    "doi": "https://doi.org/10.1007/978-1-349-19059-1_17",
                    "title": null,
                    "display_name": null,
                    "publication_year": 1400,
                    "publication_date": "1400-01-01",
                    "ids": {
                        "openalex": "https://openalex.org/W2496949965",
                        "doi": "https://doi.org/10.1007/978-1-349-19059-1_17",
                        "mag": "2496949965"
                    },
                    "language": null,
                    "primary_location": {
                        "is_oa": false,
                        "landing_page_url": "https://doi.org/10.1007/978-1-349-19059-1_17",
                        "pdf_url": null,
                        "source": {
                            "id": "https://openalex.org/S4306488690",
                            "display_name": "Macmillan Education UK-London eBooks",
                            "issn_l": null,
                            "issn": null,
                            "is_oa": false,
                            "is_in_doaj": false,
                            "host_organization": null,
                            "host_organization_name": null,
                            "host_organization_lineage": [],
                            "host_organization_lineage_names": [],
                            "type": "ebook platform"
                        },
                        "license": null,
                        "version": null,
                        "is_accepted": false,
                        "is_published": false
                    },
                    "type": "book-chapter",
                    "type_crossref": "book-chapter",
                    "open_access": {
                        "is_oa": -1,
                        "oa_status": "closed",
                        "oa_url": null,
                        "any_repository_has_fulltext": false
                    },
                    "authorships": [
                        {
                            "author_position": "first",
                            "author": {
                                "id": "https://openalex.org/A5077911418",
                                "display_name": "Ernesto Laclau",
                                "orcid": null
                            },
                            "institutions": [],
                            "countries": [],
                            "is_corresponding": true,
                            "raw_author_name": "Ernesto Laclau",
                            "raw_affiliation_string": "",
                            "raw_affiliation_strings": []
                        }
                    ],
                    "countries_distinct_count": 0,
                    "institutions_distinct_count": 0,
                    "corresponding_author_ids": [
                        "https://openalex.org/A5077911418"
                    ],
                    "corresponding_institution_ids": [],
                    "apc_list": null,
                    "apc_paid": null,
                    "has_fulltext": false,
                    "cited_by_count": 75,
                    "cited_by_percentile_year": {
                        "min": 99,
                        "max": 100
                    },
                    "biblio": {
                        "volume": null,
                        "issue": null,
                        "first_page": null,
                        "last_page": null
                    },
                    "is_retracted": false,
                    "is_paratext": false,
                    "keywords": [],
                    "concepts": [
                        {
                            "id": "https://openalex.org/C41008148",
                            "wikidata": "https://www.wikidata.org/wiki/Q21198",
                            "display_name": "Computer science",
                            "level": 0,
                            "score": 0.25131202
                        }
                    ],
                    "mesh": [],
                    "locations_count": 1,
                    "locations": [
                        {
                            "is_oa": false,
                            "landing_page_url": "https://doi.org/10.1007/978-1-349-19059-1_17",
                            "pdf_url": null,
                            "source": {
                                "id": "https://openalex.org/S4306488690",
                                "display_name": "Macmillan Education UK-London eBooks",
                                "issn_l": null,
                                "issn": null,
                                "is_oa": false,
                                "is_in_doaj": false,
                                "host_organization": null,
                                "host_organization_name": null,
                                "host_organization_lineage": [],
                                "host_organization_lineage_names": [],
                                "type": "ebook platform"
                            },
                            "license": null,
                            "version": null,
                            "is_accepted": false,
                            "is_published": false
                        }
                    ],
                    "best_oa_location": null,
                    "sustainable_development_goals": [],
                    "grants": [],
                    "referenced_works_count": 0,
                    "referenced_works": [],
                    "related_works": [
                        "https://openalex.org/W66923748",
                        "https://openalex.org/W93556995",
                        "https://openalex.org/W426356743",
                        "https://openalex.org/W1483339446",
                        "https://openalex.org/W1537640319",
                        "https://openalex.org/W1555675111",
                        "https://openalex.org/W1586576370",
                        "https://openalex.org/W1592635331",
                        "https://openalex.org/W1735617816",
                        "https://openalex.org/W1967541354",
                        "https://openalex.org/W1987963346",
                        "https://openalex.org/W2004597467",
                        "https://openalex.org/W2007161913",
                        "https://openalex.org/W2037818241",
                        "https://openalex.org/W2063460205",
                        "https://openalex.org/W2072026461",
                        "https://openalex.org/W2076477348",
                        "https://openalex.org/W2346933831",
                        "https://openalex.org/W2505337522",
                        "https://openalex.org/W2550053193"
                    ],
                    "ngrams_url": "https://api.openalex.org/works/W2496949965/ngrams",
                    "abstract_inverted_index": null,
                    "cited_by_api_url": "https://api.openalex.org/works?filter=cites:W2496949965",
                    "counts_by_year": [
                        {
                            "year": 2022,
                            "cited_by_count": 3
                        },
                        {
                            "year": 2021,
                            "cited_by_count": 2
                        },
                        {
                            "year": 2020,
                            "cited_by_count": 1
                        },
                        {
                            "year": 2019,
                            "cited_by_count": 5
                        },
                        {
                            "year": 2018,
                            "cited_by_count": 3
                        },
                        {
                            "year": 2017,
                            "cited_by_count": 3
                        },
                        {
                            "year": 2016,
                            "cited_by_count": 2
                        },
                        {
                            "year": 2015,
                            "cited_by_count": 2
                        },
                        {
                            "year": 2014,
                            "cited_by_count": 3
                        },
                        {
                            "year": 2013,
                            "cited_by_count": 4
                        },
                        {
                            "year": 2012,
                            "cited_by_count": 4
                        }
                    ],
                    "updated_date": "2023-12-10T01:55:54.631106",
                    "created_date": "2016-08-23",
                    "abstract": "",
                    "2023_cited_count": 0
                },
                {
                    "id": "https://openalex.org/W2483054211",
                    "doi": "https://doi.org/10.1007/978-1-349-19059-1_42",
                    "title": null,
                    "display_name": null,
                    "publication_year": 1400,
                    "publication_date": "1400-01-01",
                    "ids": {
                        "openalex": "https://openalex.org/W2483054211",
                        "doi": "https://doi.org/10.1007/978-1-349-19059-1_42",
                        "mag": "2483054211"
                    },
                    "language": null,
                    "primary_location": {
                        "is_oa": false,
                        "landing_page_url": "https://doi.org/10.1007/978-1-349-19059-1_42",
                        "pdf_url": null,
                        "source": {
                            "id": "https://openalex.org/S4306488690",
                            "display_name": "Macmillan Education UK-London eBooks",
                            "issn_l": null,
                            "issn": null,
                            "is_oa": false,
                            "is_in_doaj": false,
                            "host_organization": null,
                            "host_organization_name": null,
                            "host_organization_lineage": [],
                            "host_organization_lineage_names": [],
                            "type": "ebook platform"
                        },
                        "license": null,
                        "version": null,
                        "is_accepted": false,
                        "is_published": false
                    },
                    "type": "book-chapter",
                    "type_crossref": "book-chapter",
                    "open_access": {
                        "is_oa": -1,
                        "oa_status": "closed",
                        "oa_url": null,
                        "any_repository_has_fulltext": false
                    },
                    "authorships": [
                        {
                            "author_position": "first",
                            "author": {
                                "id": "https://openalex.org/A5026430454",
                                "display_name": "lain Chambers",
                                "orcid": null
                            },
                            "institutions": [],
                            "countries": [],
                            "is_corresponding": true,
                            "raw_author_name": "lain Chambers",
                            "raw_affiliation_string": "",
                            "raw_affiliation_strings": []
                        }
                    ],
                    "countries_distinct_count": 0,
                    "institutions_distinct_count": 0,
                    "corresponding_author_ids": [
                        "https://openalex.org/A5026430454"
                    ],
                    "corresponding_institution_ids": [],
                    "apc_list": null,
                    "apc_paid": null,
                    "has_fulltext": false,
                    "cited_by_count": 38,
                    "cited_by_percentile_year": {
                        "min": 98,
                        "max": 99
                    },
                    "biblio": {
                        "volume": null,
                        "issue": null,
                        "first_page": null,
                        "last_page": null
                    },
                    "is_retracted": false,
                    "is_paratext": false,
                    "keywords": [],
                    "concepts": [
                        {
                            "id": "https://openalex.org/C41008148",
                            "wikidata": "https://www.wikidata.org/wiki/Q21198",
                            "display_name": "Computer science",
                            "level": 0,
                            "score": 0.2461732
                        }
                    ],
                    "mesh": [],
                    "locations_count": 1,
                    "locations": [
                        {
                            "is_oa": false,
                            "landing_page_url": "https://doi.org/10.1007/978-1-349-19059-1_42",
                            "pdf_url": null,
                            "source": {
                                "id": "https://openalex.org/S4306488690",
                                "display_name": "Macmillan Education UK-London eBooks",
                                "issn_l": null,
                                "issn": null,
                                "is_oa": false,
                                "is_in_doaj": false,
                                "host_organization": null,
                                "host_organization_name": null,
                                "host_organization_lineage": [],
                                "host_organization_lineage_names": [],
                                "type": "ebook platform"
                            },
                            "license": null,
                            "version": null,
                            "is_accepted": false,
                            "is_published": false
                        }
                    ],
                    "best_oa_location": null,
                    "sustainable_development_goals": [],
                    "grants": [],
                    "referenced_works_count": 0,
                    "referenced_works": [],
                    "related_works": [
                        "https://openalex.org/W390659891",
                        "https://openalex.org/W1518551286",
                        "https://openalex.org/W1537197913",
                        "https://openalex.org/W1868716976",
                        "https://openalex.org/W1971993879",
                        "https://openalex.org/W1981728709",
                        "https://openalex.org/W1991421331",
                        "https://openalex.org/W1996853462",
                        "https://openalex.org/W2013889685",
                        "https://openalex.org/W2028415329",
                        "https://openalex.org/W2033296412",
                        "https://openalex.org/W2037767848",
                        "https://openalex.org/W2047788083",
                        "https://openalex.org/W2073698981",
                        "https://openalex.org/W2083678877",
                        "https://openalex.org/W2102881174",
                        "https://openalex.org/W2112274686",
                        "https://openalex.org/W2115144921",
                        "https://openalex.org/W2121794228",
                        "https://openalex.org/W2156908561"
                    ],
                    "ngrams_url": "https://api.openalex.org/works/W2483054211/ngrams",
                    "abstract_inverted_index": null,
                    "cited_by_api_url": "https://api.openalex.org/works?filter=cites:W2483054211",
                    "counts_by_year": [
                        {
                            "year": 2020,
                            "cited_by_count": 1
                        },
                        {
                            "year": 2013,
                            "cited_by_count": 1
                        }
                    ],
                    "updated_date": "2023-12-16T08:54:13.069246",
                    "created_date": "2016-08-23",
                    "abstract": "",
                    "2023_cited_count": 0
                }
            ],
            "group_by": []
        }
    ]
}
const getGroupDataList = {
    "msgno": 1,
    "msg": "论文列表分组成功",
    "group_of_entity_data": {
        "meta": {
            "count": 65721,
            "db_response_time_ms": 97,
            "page": 1,
            "per_page": 200,
            "groups_count": 11
        },
        "group_by": [
            {
                "key": "article",
                "key_display_name": "article",
                "count": 64303
            },
            {
                "key": "book-chapter",
                "key_display_name": "book-chapter",
                "count": 797
            },
            {
                "key": "book",
                "key_display_name": "book",
                "count": 448
            },
            {
                "key": "report",
                "key_display_name": "report",
                "count": 107
            },
            {
                "key": "other",
                "key_display_name": "other",
                "count": 44
            },
            {
                "key": "dissertation",
                "key_display_name": "dissertation",
                "count": 8
            },
            {
                "key": "paratext",
                "key_display_name": "paratext",
                "count": 6
            },
            {
                "key": "letter",
                "key_display_name": "letter",
                "count": 4
            },
            {
                "key": "erratum",
                "key_display_name": "erratum",
                "count": 2
            },
            {
                "key": "editorial",
                "key_display_name": "editorial",
                "count": 1
            },
            {
                "key": "reference-entry",
                "key_display_name": "reference-entry",
                "count": 1
            },
            {
                "key": "dataset",
                "key_display_name": "dataset",
                "count": 0
            },
            {
                "key": "peer-review",
                "key_display_name": "peer-review",
                "count": 0
            },
            {
                "key": "standard",
                "key_display_name": "standard",
                "count": 0
            },
            {
                "key": "grant",
                "key_display_name": "grant",
                "count": 0
            }
        ]
    }
}
const searchDataList = ref([]);
searchDataList.value = getdatalistres.list_of_entity_data[0].results;
var totalSearchResNum = ref(0);
totalSearchResNum = getdatalistres.list_of_entity_data[0].meta.count;
// 搜索结果数据列表
// const searchDataList = ref([]);
// // 搜索结果总数
// var totalSearchResNum = ref(0);
/**
 * 当前需要的搜索结果是第几页。
 * 注意，除了“页数更改搜索”外，“过滤搜索”、“排序搜索”、“页尺寸更改搜索”都会重置当前页数为第1页。
 * “分组搜索” 和 页数、页尺寸无关。
 */
const searchResPageIndex =  ref(1);
// 搜索结果每一页的尺寸
const searchResPageSize = ref(10);
/**
 * “页数更改搜索”的防止误触逻辑锁
 * 因为除了“页数更改搜索”外，“过滤搜索”、“排序搜索”、“页尺寸更改搜索”都会重置当前页数为第1页
 * “分组搜索” 和 页数、页尺寸无关
 * 对当前页数的重置在原来页数不为1时会触发对于 searchResPageIndex 的监听
 * 在这些搜索触发时，不应该触发“页数更改搜索”
 */
const pageIndexChangeSearchLock = ref(false);
/**
 * 页数坐标发生改变时，触发搜索函数
 * “页数更改搜索”
 */
const handlePageIndexChangeSearch = () => {
  var data = {
    "entity_type": searchStore.searchType,
    "params": {
      "filter": buildAllTypeFilterKey(),
      "page": searchResPageIndex.value,
      "per_page": searchResPageSize.value,
      "search" : searchStore.searchInputText,
      "sort": buildSortKey(),
    }
  };
  console.log("页数更改触发搜索，前端发出的请求体");
  console.log(data);
  Search.getSearchDataList(data)
  .then((res) => {
    if (res.data.result === 1) {
      searchDataList.value = res.data.list_of_entity_data[0].results;
      totalSearchResNum.value = res.data.list_of_entity_data[0].meta.count;
      console.log(searchDataList);
      ElNotification({
        title: "恭喜您",
        message: `搜索成功，用时 ${res.data.list_of_entity_data[0].meta.db_response_time_ms / 1000} s`,
        type: "success",
        duration: 3000
      });
    }
  })
  .catch((err) => {
    console.log(err);
  });
};
watch(
  searchResPageIndex,
  () => {
    // 注意这里可能原来的页数就是1，因此即使是其他搜索重置为1，也不一定会触发watch
    // 但是当原来页数不为1时，这里watch的上锁逻辑就是必要的，避免重复触发搜索
    console.log("页数发生了变化");
    // 确保不是由其他搜索触发的页数变化
    if (pageIndexChangeSearchLock.value === false) {
      console.log("触发 页数更改搜索")
      handlePageIndexChangeSearch();
    }
  }
);


// #region 每页数据量尺寸相关 -----------------------------------------------------------------------
/**
 * 切换每页的数据量尺寸的DOM
 * 这里是为了呈现出选中时不一样的样式
 */
const pageSizeDom = ref([]);
const setPageSizeDom = (DOMElement) => {
  pageSizeDom.value.push(DOMElement);
};
// 更新页面尺寸 + 更改样式
const chosePageSize = (sizeIndex) => {
  searchResPageSize.value = pageSizeArray[sizeIndex];
  for(let i = 0; i < pageSizeArray.length; i++) {
    pageSizeDom.value[i].classList.remove("current");
  }
  pageSizeDom.value[sizeIndex].classList.add("current");
}
/**
 * 每页的数据尺寸发生改变时，触发搜索函数
 * @param {number} sizeIndex 新的尺寸在数组中的索引
 */
const handlePageSizeChangeSearch = (sizeIndex) => {
  chosePageSize(sizeIndex);
  // 上锁，避免触发“页数更改搜索”
  pageIndexChangeSearchLock.value = true;
  // 重置当前页数为第1页
  searchResPageIndex.value = 1;
  var data = {
    "entity_type": searchStore.searchType,
    "params": {
      "filter": buildAllTypeFilterKey(),
      "page": searchResPageIndex.value,
      "per_page": searchResPageSize.value,
      "search" : searchStore.searchInputText,
      "sort": buildSortKey(),
    }
  };
  console.log("页尺寸更改触发搜索，前端发出的请求体");
  console.log(data);
  Search.getSearchDataList(data)
  .then((res) => {
    if (res.data.result === 1) {
      searchDataList.value = res.data.list_of_entity_data[0].results;
      totalSearchResNum.value = res.data.list_of_entity_data[0].meta.count;
      console.log(searchDataList);
      ElNotification({
        title: "恭喜您",
        message: `搜索成功，用时 ${res.data.list_of_entity_data[0].meta.db_response_time_ms / 1000} s`,
        type: "success",
        duration: 3000
      });
      // 解锁，可以触发“页数更改搜索”
      pageIndexChangeSearchLock.value = false;
    }
  })
  .catch((err) => {
    console.log(err);
    // 解锁，可以触发“页数更改搜索”
    pageIndexChangeSearchLock.value = false;
  })
};
// #endregion 每页数据量尺寸相关 --------------------------------------------------------------------


// #region ！！过滤区域 -----------------------------------------------------------------------
/**
 * 过滤器下拉栏DOM
 * 这里由于 ref 是动态绑定在 AllTypeFilterList[searchStore.searchType] 上的
 * 所以不需要分开，一个就足够了
 */
const filterUnitDOM = ref([]);
const setFilterUnitDOM = (DOMElement) => {
  filterUnitDOM.value.push(DOMElement);
};
/**
 * 五大实体的 过滤器筛选数据列表。
 */
const AllTypeFilterList = reactive({
  "works": [
    {
      group: "publication_year",
      title: "发表年份 Publication Year",
      objectArray: [],
      stringArray: [],
      selectedArray: []
    },
    {
      group: "host_venue.id",
      title: "文献来源 Host Venue",
      objectArray: [],
      stringArray: [],
      selectedArray: []
    },
    {
      // 可以不带有 authorships
      group: "authorships.author.id",
      title: "作者 Author",
      objectArray: [],
      stringArray: [],
      selectedArray: []
    },
    {
      group: "authorships.institutions.id",
      title: "机构 Institution",
      objectArray: [],
      stringArray: [],
      selectedArray: []
    },
    {
      group: "authorships.institutions.country_code",
      title: "机构所属国家 Country",
      objectArray: [],
      stringArray: [],
      selectedArray: []
    },
    {
      group: "authorships.institutions.type",
      title: "机构类型 Institution Type",
      objectArray: [],
      stringArray: [],
      selectedArray: []
    },
    {
      group: "concepts.id",
      title: "文献领域 Concept",
      objectArray: [],
      stringArray: [],
      selectedArray: []
    },
  ],
  "authors": [
    {
      group: "last_known_institution.id",
      title: "机构 Institution",
      objectArray: [],
      stringArray: [],
      selectedArray: []
    },
    {
      group: "last_known_institution.country_code",
      title: "机构所属国家 Country",
      objectArray: [],
      stringArray: [],
      selectedArray: []
    },
    {
      group: "last_known_institution.type",
      title: "机构类型 Institution Type",
      objectArray: [],
      stringArray: [],
      selectedArray: []
    },
    {
      group: "x_concepts.id",
      title: "领域 Concept",
      objectArray: [],
      stringArray: [],
      selectedArray: []
    },
  ],
  "venues": [
    {
      group: "issn",
      title: "ISSN版本号 ISSN",
      objectArray: [],
      stringArray: [],
      selectedArray: []
    },
    {
      group: "x_concepts.id",
      title: "领域 Concept",
      objectArray: [],
      stringArray: [],
      selectedArray: []
    },
  ],
  "institutions": [
    {
      group: "country_code",
      title: "机构所属国家 Country",
      objectArray: [],
      stringArray: [],
      selectedArray: []
    },
    {
      group: "type",
      title: "机构类型 Institution Type",
      objectArray: [],
      stringArray: [],
      selectedArray: []
    },
    {
      group: "x_concepts.id",
      title: "领域 Concept",
      objectArray: [],
      stringArray: [],
      selectedArray: []
    },
  ],
  "concepts": [
    {
      group: "ancestors.id",
      title: "父级概念 Ancestors Concept",
      objectArray: [],
      stringArray: [],
      selectedArray: []
    },
    {
      group: "level",
      title: "概念层级 Concept Level",
      objectArray: [],
      stringArray: [],
      selectedArray: []
    },
  ],
});

/**
 * 展开/收起过滤单元的下拉栏
 * 并触发 “分组搜索”
 * 注意，用户已经勾选的筛选项也会影响“分组搜索”获取的结果
 * @param {HTMLElement} filterDOM 当前搜索筛选列表中的 某个过滤单元对应的DOM
 * @param {Number} index 过滤单元DOM在整个DOM数组中的位置，也是过滤单元在 当前搜索筛选列表 中的位置
 */
const handleAllTypeGroupSearch = (filterDOM, index) => {
  // 注意这里传入的不是 ref 包裹的DOM元素，而是在模板中自动解析以后的value，直接就是HTMLDOM
  if (filterDOM.classList.contains('js--open')) {
    filterDOM.classList.remove('js--open');   // 收起
  } else {
    var data = {
      "entity_type": searchStore.searchType,
      "params": {
        "filter": buildAllTypeFilterKey(),
        // 具体到当前搜索类型对应的筛选列表的某个筛选单元的标题
        "group_by": AllTypeFilterList[searchStore.searchType][index].group,
        "page": 1,
        "per_page": searchResPageSize.value,
        "search" : searchStore.searchInputText,
        "sort": buildSortKey(),
      }
    };
    console.log("分组搜索，前端发出的请求体");
    console.log(data);
    Search.getGroupDataList(data)
    .then((res) => {
      if (res.data.result === 1) {
        let groupArray = res.data.groups_of_entity_data.group_by;

        AllTypeFilterList[searchStore.searchType][index].objectArray = groupArray;
        // 这是每个筛选单元要呈现在页面中的 选项文本
        AllTypeFilterList[searchStore.searchType][index].stringArray = groupArray.map(item => item.key_display_name);
      }
      filterDOM.classList.add('js--open');  // 获取数据成功才执行“展开”
    })
    .catch((err) => {
      console.log(err);
    })
  }
};

// 出现“确认”“取消”勾选的过滤器的按钮
const confirmFilterSearch = ref(false);
const handleChange = (index) => {
  console.log("过滤项目在改变");
  console.log(AllTypeFilterList[searchStore.searchType][index].selectedArray);
  confirmFilterSearch.value = true;
};
/**
 * 遍历所有的筛选字段。
 * 将用户已经勾选的条目构建出 filter 字段
 * (对象类型)以便于发送给后端
 * @return 一个对象
 */
const buildAllTypeFilterKey = () => {
  var filter = {};
  // 得到当前筛选单元列表
  const currentFilterList = AllTypeFilterList[searchStore.searchType];
  var filterListLength = currentFilterList.length;

  for (let i = 0; i < filterListLength; i++) {
    // 利用 [] 给对象创建一个键字段，
    // 这里使用的是 静态数据中的group字段，即构造出后端需要的 filter 对象中的键值
    const groupKey = currentFilterList[i].group;
    filter[groupKey] = "";
    // 遍历每一个筛选单元中， 代表“选中”的 label 数组
    for(let j = 0; j < currentFilterList[i].selectedArray.length; j++) {
      filter[groupKey] += currentFilterList[i].selectedArray[j] + "|";
    }
    // 去掉最后一个 '|' 字符
    filter[groupKey] = filter[groupKey].slice(0, -1);
  }
  return filter;
};
/**
 * 确定要进行 “带有搜索筛选字段” 的 搜索
 */
const handleAllTypeFilterSearch = () => {
  // 收起两个按钮
  confirmFilterSearch.value = false;
  // 上锁，避免触发“页数更改搜索”
  pageIndexChangeSearchLock.value = true;
  // 重置当前页数为第1页
  searchResPageIndex.value = 1;
  // 收起所有的筛选单元
  for(let i = 0; i < 7; i++) {
    if (filterUnitDOM.value[i].classList.contains('js--open')) {
      filterUnitDOM.value[i].classList.remove('js--open');
    }
  }
  var data = {
    "entity_type": searchStore.searchType,
    "params": {
      "filter": buildAllTypeFilterKey(),
      "page": 1,
      "per_page": searchResPageSize.value,
      "search" : searchStore.searchInputText,
      "sort": buildSortKey(),
    }
  };
  console.log("用户筛选搜索，前端发出的请求体");
  console.log(data);
  Search.getSearchDataList(data)
  .then((res) => {
    if (res.data.result === 1) {
      searchDataList.value = res.data.list_of_entity_data[0].results;
      totalSearchResNum.value = res.data.list_of_entity_data[0].meta.count;
      // console.log(searchDataList);
      ElNotification({
        title: "恭喜您",
        message: `搜索成功，用时 ${res.data.list_of_entity_data[0].meta.db_response_time_ms / 1000} s`,
        type: "success",
        duration: 3000
      });
      // 解锁，可以触发“页数更改搜索”
      pageIndexChangeSearchLock.value = false;
    }
  })
  .catch((err) => {
    console.log(err);
    // 解锁，可以触发“页数更改搜索”
    pageIndexChangeSearchLock.value = false;
  })
};
/**
 * 取消要进行 “带有搜索筛选字段” 的 搜索
 * 并清空所有已经勾选的筛选条目
 */
const cancelFilterSearch = () => {
  confirmFilterSearch.value = false;
  // 得到当前筛选单元列表
  const currentFilterList = AllTypeFilterList[searchStore.searchType];
  var filterListLength = currentFilterList.length;
  // 清空所有选择
  for (let i = 0; i < filterListLength; i++) {
    currentFilterList[i].selectedArray = [];
  }
};
// #endregion ！！过滤区域 -----------------------------------------------------------------------


// #region 数据结果排序类型相关 -----------------------------------------------------------------------
/**
 * 排序类型选择数组
 * 初始化默认删去当前搜索实体 在当前选中的 排序类型
 */
const remainSortTypeArray = ref(allEntitySortType[searchStore.searchType].filter(
  (sortType) => sortType !== searchStore.sortType
));

/**
 * 排序方式下拉栏DOM
 * 具体选项 由remainSortTypeArray 动态绑定，这里DOM只处理“展开”和“收起”
 */
const sortDropdownTarget = ref(null);
const expandSortDropdown = () => {
  sortDropdownTarget.value.classList.contains('js--open')
    ? sortDropdownTarget.value.classList.remove('js--open')
    : sortDropdownTarget.value.classList.add('js--open')
};
/**
 * 根据用户选择的sort类型，构建出 sort 字段
 * (对象类型)以便于发送给后端
 * @return 一个对象
 */
const buildSortKey = () => {
  var sort = {};
  if (searchStore.searchType === "works") {
    // 这是因为有可能在sortType为 "More Works" "Less Works" 时切换到 works
    // 此时就要 重置 排序方式
    if (searchStore.sortType === "More Works" || searchStore.sortType === "Less Works") {
      searchStore.sortType = "Relevance";
    }
    switch (searchStore.sortType) {
      case "Relevance":
        break;
      case "Earliest":
        sort["publication_date"] = "asc";
        break;
      case "Latest":
        sort["publication_date"] = "desc";
        break;
      case "Cited":
        sort["cited_by_count"] = "desc";
        break;
    }
  } else {
    // 这是因为有可能在sortType为 "Earliest" "Latest" 时切换到 除了 works 以外的4大实体
    // 此时就要 重置 排序方式
    if (searchStore.sortType === "Earliest" || searchStore.sortType === "Latest") {
      searchStore.sortType = "Relevance";
    }
    switch (searchStore.sortType) {
      case "Relevance":
        break;
      case "More Works":
        sort["works_count"] = "desc";
        break;
      case "Less Works":
        sort["works_count"] = "asc";
        break;
      case "Cited":
        sort["cited_by_count"] = "desc";
        break;
    }
  }
  return sort;
};

/**
 * 切换搜索实体类型时
 * 1.排除 因搜索实体不同、合法的排序方式不同 而产生的非法情况
 * 2.更新排序方式数组备选项，排除当前选中的类型那一条
 * 3.触发 “点击一次按钮搜索”
 * 和左侧筛选栏不同，排序方式数组的数据 没有直接绑定 allEntitySortType[searchStore.searchType]
 * 所以需要 watch 来完成
 */
watch(
  () => searchStore.searchType,
  (newSearchType) => {
    if (newSearchType === "works") {
      // 这是因为有可能在sortType为 "More Works" "Less Works" 时切换到 works
      // 此时就要 重置 排序方式
      if (searchStore.sortType === "More Works" || searchStore.sortType === "Less Works") {
        searchStore.sortType = "Relevance";
      }
    } else {
      // 这是因为有可能在sortType为 "Earliest" "Latest" 时切换到 除了 works 以外的4大实体
      // 此时就要 重置 排序方式
      if (searchStore.sortType === "Earliest" || searchStore.sortType === "Latest") {
        searchStore.sortType = "Relevance";
      }
    }
    // 更新排序方式数组备选项，排除当前选中的类型那一条
    remainSortTypeArray.value = allEntitySortType[newSearchType].filter(
      (sortType) => sortType !== searchStore.sortType
    );
    handleFinalSearch(searchStore.searchInputText, searchStore.searchType);
  }
);

/**
 * 切换排序方式触发的搜索函数
 * @param {String} newSortType 排序类型
 */
const handleAllTypeSortSearch = async (newSortType) => {
  // 点击以后立即收起下拉栏
  expandSortDropdown();
  // 上锁，避免触发“页数更改搜索”
  pageIndexChangeSearchLock.value = true;
  // 重置当前页数为第1页
  searchResPageIndex.value = 1;
  // 记录排序类型，并作持久化处理
  searchStore.setSortType(newSortType);

  // 更新排序方式数组备选项，排除当前选中的类型那一条
  remainSortTypeArray.value = allEntitySortType[searchStore.searchType].filter(
    (sortType) => sortType !== searchStore.sortType
  );
  console.log(searchStore.sortType, searchStore.searchInputText, searchStore.searchType);
  // 确保搜索文本不为空
  if (searchStore.searchInputText) {
    var data = {
      "entity_type": searchStore.searchType,
      "params": {
        "filter": buildAllTypeFilterKey(),
        "page": 1,
        "per_page": searchResPageSize.value,
        "search" : searchStore.searchInputText,
        "sort" : buildSortKey(),
      }
    }
    console.log("切换排序方式搜索，前端发出的请求体");
    console.log(data);
    Search.getSearchDataList(data)
    .then((res) => {
      if (res.data.result === 1) {
        searchDataList.value = res.data.list_of_entity_data[0].results;
        totalSearchResNum.value = res.data.list_of_entity_data[0].meta.count;
        // console.log(searchDataList);
        ElNotification({
          title: "恭喜您",
          message: `搜索成功，用时 ${res.data.list_of_entity_data[0].meta.db_response_time_ms / 1000} s`,
          type: "success",
          duration: 3000
        });
        // 解锁，可以触发“页数更改搜索”
        pageIndexChangeSearchLock.value = false;
      }
    })
    .catch((err) => {
      console.log(err);
      // 解锁，可以触发“页数更改搜索”
      pageIndexChangeSearchLock.value = false;
    })
  }
};
// #endregion 数据结果排序类型相关 --------------------------------------------------------------------


/**
 * 核心搜索函数。点击搜索按钮/刷新后触发的搜索函数
 * > 刷新页面以后，依然按照用户设定的 searchType searchText pageSize sortType 进行一次搜索
 * > 但是过滤条件对象重置为空，不向后端传递。pageIndex 重置为 1。即：
 * > “保留 搜索实体类型、搜索文本、用户选定的每页数据尺寸、用户选定的排序方式；
 * > 取消 用户设置的筛选条件；重置当前页索引是 1”
 * @param {String} searchText 搜索文本
 * @param {String} searchEntityType 搜索实体类
 */
const handleFinalSearch = (searchText, searchEntityType) => {
  console.log(searchText, searchEntityType);
  if (searchText) {
    // 上锁，避免触发“页数更改搜索”
    pageIndexChangeSearchLock.value = true;
    // 重置当前页数为第1页
    searchResPageIndex.value = 1;
    // 清空所有筛选选择
    cancelFilterSearch();
    var data = {
      "entity_type": searchEntityType,
      "params": {
        "page": 1,
        "per_page": searchResPageSize.value,
        "search" : searchText,
        "sort" : buildSortKey(),
      }
    }
    Search.getSearchDataList(data)
    .then((res) => {
      if (res.data.result === 1) {
        // console.log(res.data.list_of_data);
        searchDataList.value = res.data.list_of_entity_data[0].results;
        totalSearchResNum.value = res.data.list_of_entity_data[0].meta.count;
        console.log(searchDataList);
        ElNotification({
          title: "恭喜您",
          message: `搜索成功，用时 ${res.data.list_of_entity_data[0].meta.db_response_time_ms / 1000} s`,
          type: "success",
          duration: 3000
        });
        // 解锁，可以触发“页数更改搜索”
        pageIndexChangeSearchLock.value = false;
      }
    })
    .catch((err) => {
      ElNotification({
        title: "很遗憾",
        message: err.message,
        type: "error",
        duration: 3000
      });
      // 解锁，可以触发“页数更改搜索”
      pageIndexChangeSearchLock.value = false;
    })
  }
};

</script>

<style>
.el-checkbox__inner{
  background-color: #fff;
}
.el-checkbox__input.is-checked .el-checkbox__inner {
  background-color: black;
  border-color: black;
}
.el-checkbox__inner:hover {
  border-color: black;
}
.el-checkbox__input.is-checked+.el-checkbox__label {
  color: black;
  font-weight: bold;
}
.pagination-container .el-pager li.is-active {
  cursor: default;
  color: black;
  font-weight: bold;
}
.pagination-container .el-pager li:hover {
  color: black;
  font-weight: bold;
}
.pagination-container .el-pagination button:hover {
  color: black;
}
.pagination-container .el-input__wrapper.is-focus {
  box-shadow: 0 0 0 1px black;
}
</style>

<style scoped>
/* 这里的样式造成了在a标签中 图标i标签在hover时的变色 */
a, a:hover, a:focus {
  color: inherit;
  text-decoration: none;
  background-color: transparent;
}

/* 清除外边距折叠和高度塌陷 */
.clearfix::before,
.clearfix::after {
  content: '';
  display: table;
  clear: both;
}

.rlist--inline {
  cursor: default;
  list-style: none;
  margin: 0;
  padding: 0;
}
.rlist--inline>li {
  display: inline-block;
}

.search-detail-container{
  box-sizing: border-box;
  /* background-color: rgb(228 228 231); */
  /* background-color: rgb(234, 234, 234); */
  background-color: rgb(255, 255, 255);
  font-family: Merriweather Sans,sans-serif;
  line-height: 1.4;
  word-wrap: break-word;
  /* 控制一些手机或平板设备上使用的文本溢出算法，使用一个百分数来确定文本放大程度。 */
  text-size-adjust: 100%;
}
/* #region 搜索区域 */
.search-area{
  /* background-color: rgb(147 197 253); */
  background-color: white;
  width: 100%;
  padding: 10px 20px;
}
.search-area-handler {
  width: 100%;
  display: flex;
  align-items: center;
}
.search-area .search-input{
  max-width: 50%;
  margin: auto;
}

/* #endregion 搜索区域结束 */


/* #region 筛选条件区域 */
.result-area{
  min-height: 37.5rem;  /* 600px */
  padding-top: 0;
  margin-top: 1.25rem;  /* 20px */
  /* border: 1px solid black; */
  box-sizing: border-box;
}

.result-content {
  margin-right: auto;
  margin-left: auto;
  padding-left: 15px;
  padding-right: 15px;
  /* border: 1px solid yellow; */
}
.row {
  margin-left: -15px;
  margin-right: -15px;
}
.col-lg-1, .col-lg-2, .col-lg-3, .col-lg-4, .col-lg-5, .col-lg-6,
.col-lg-7, .col-lg-8, .col-lg-9, .col-lg-10, .col-lg-11, .col-lg-12,
.col-md-1, .col-md-2, .col-md-3, .col-md-4, .col-md-5, .col-md-6,
.col-md-7, .col-md-8, .col-md-9, .col-md-10, .col-md-11, .col-md-12,
.col-sm-1, .col-sm-2, .col-sm-3, .col-sm-4, .col-sm-5, .col-sm-6,
.col-sm-7, .col-sm-8, .col-sm-9, .col-sm-10, .col-sm-11, .col-sm-12,
.col-xs-1, .col-xs-2, .col-xs-3, .col-xs-4, .col-xs-5, .col-xs-6,
.col-xs-7, .col-xs-8, .col-xs-9, .col-xs-10, .col-xs-11, .col-xs-12 {
  position: relative;
  min-height: 1px;
  padding-left: 15px;
  padding-right: 15px;
}

.sticko__child {
  overflow-x: hidden;
  /* border: 1px solid black; */
}

.colored-block {
  /* 20px */
  margin-bottom: 1.25rem;
  box-sizing: border-box;
}
.colored-block-title {
  background-color: #f0f0f0;
  padding: .875rem 0;
  position: relative;
  box-sizing: border-box;
  cursor: pointer;
  /* border: 1px solid black; */
}
.colored-block-title-context {
  /* 下面三行创造 标题左边的黑色色块 */
  border-left: 8px solid;
  padding-left: 8px;
  border-color: #000000;
  margin: 0;
  font-size: 18px;
  line-height: 18px;
  font-family: 'Times New Roman', Times, "Microsoft YaHei", serif;
  font-weight: 600;
}

.colored-block.js--open .colored-block-icon {
  transform: rotate(360deg);
}
.colored-block-icon {
  position: absolute;
  z-index: 3;
  top: 10px;
  right: 12px;
  font-size: 18px;
  transition: transform .5s;
  transform: rotate(180deg);
  /* box-sizing: border-box;
  border: 1px solid black; */
}

.colored-block-content {
  /* display: none; */
  /* max-height: 0; */
  /* height: 0; */
  overflow: hidden;
  position: relative;
  /* padding: 0 16px; */
  padding: 0 8px;
  background-color: #fafafa;
  box-sizing: border-box;
  transition: all .5s;
}
.end-dash{
  /* display: none; */
  width: 1.125rem;
  height: .25rem;
  background: #000;
  position: absolute;
  /* bottom: 0; */
  bottom: 1px;
  right: 1rem;
}

.colored-block.js--open .colored-block-content .filter-block {
  /* display: block; */
  max-height: 237px;
  overflow-y: auto;
}
/*
  VERY IMPORTANT
  妙手偶得，通过负数外边距、正数内边距，
  可以创造出一个隐藏滚动条的水平侧空间
*/
.filter-block {
  /* display: none; */
  max-height: 0;
  overflow: hidden;
  border-color: rgba(0,0,0,.12);
  border-bottom: .0625rem solid #ddd;
  padding: 0 .9375rem;
  margin-right: -.9375rem;
  margin-left: -.9375rem;
  transition: all .5s;
}
.filter-block:not(:last-child) {
  margin-bottom: 0;
}

/* ::-webkit-scrollbar 滚动条整体部分，可以设置宽度之类的 */
.filter-block::-webkit-scrollbar {
  width: 10px;
  height: 10px;
}
/* ::-webkit-scrollbar-corner 边角 */
.filter-block::-webkit-scrollbar-corner {
  background-color: initial;
}
/* ::-webkit-scrollbar-thumb 滚动条里面可以拖动的那个 */
.filter-block::-webkit-scrollbar-thumb {
  background-color: #e4e4e7 !important;
  border-radius: 5px;
}
/* ::-webkit-scrollbar-track 外层轨道 */
.filter-block::-webkit-scrollbar-track {
  background-color: transparent !important;
}


.accordion-content{
  padding: 0;
  background-color: #f0f0f0;
  width: 100%;
  clear: both;
}
.expand__list {
  font-size: .75rem;
  font-weight: 600;
  color: #454545;
}
/* 这里取消了左右边框 */
.expand__list li {
  box-sizing: border-box;
  margin: 0 -.9375rem;
  background-color: #fff;
  padding: 13px 15px;
  line-height: 14px;
  /* border: 1px solid rgba(0,0,0,.07); */
  border-top: 1px solid rgba(0,0,0,.12);
  /* border-top-color: rgba(0,0,0,.12); */
  border-bottom: none;
}
.expand__list li .chose-label {
  display: inline-block;
  vertical-align: middle;
  /* 至关重要，这里不设置宽一些会导致字段在垂直方向上显示不全 */
  line-height: 1.125rem;
  white-space: nowrap;
  max-width: 12rem;
  overflow: hidden;
  text-overflow: ellipsis;
}
.expand__list li .chose-num {
  display: inline-block;
  vertical-align: middle;
  line-height: 1.125rem;
}
@media (max-width: 768px) {
  /* 在半屏适配下，增大文本显示的最大宽度 */
  .expand__list li .chose-label {
    max-width: 38rem;
  }
}
/* #endregion 筛选条件区域结束 */

/* #region 搜索结果区域 */
.search-result__info {
  font-weight: 300;
  font-style: italic;
  /* margin-bottom: 2.1875rem; */
  /* 10px */
  margin-top: .625rem;
  background-color: white;
}
.search-result__info .search-num-info {
  font-size: 1.125rem;
}
.left-border-span {
  border-left: .5rem solid #000;
  padding-left: .375rem;
}
.search-result__info .left-border-span {
  border-color: #ebc34a;
  display: inline-block;
    /* height: 18px; */
  height: 1.125rem;
  margin-top: .25rem;
  position: absolute;
}
.search-num-info-detail {
  display: inline-block;
  padding-left: 1rem;
  position: relative;
}
.search-num-info-detail .hitlength{
  font-weight: 600;
}
.search-result {
  overflow: visible;
}


.search-result__sort {
  border-bottom: .0625rem solid #d9d9d9;
  font-size: .875rem;
}
.search-result__sort .search-result__sort-right {
  float: right;
  font-family: 'Times New Roman', Times, "Microsoft YaHei", serif;
}
@media (min-width: 768px) {
  .search-result__sort {
    position: sticky;
    background: white;
    /* transition: top .5s; */
    z-index: 555;
    left: 0;
    /* 这里改为我们的header高度-1 */
    top: 63px;
    /* margin: .625rem 0; */
    margin: 0 0 .625rem;
  }
  .search-result__sort-right {
    padding: .625rem 0;
  }
}

/* #region 左侧筛选区域的确认和取消按钮 */
.filter-btn-wrapper {
  float: left;
  margin-top: 10px;
  width: 0;
  overflow: hidden;
  transition: all 0.2s;
}
.filter-btn-wrapper.extended {
  width: 134.6px;
}

.confirm-filter-btn {
  border: none;
  outline: none;
  display: inline-block;
  position: relative;
  z-index: 0;
  padding: 8px 35.2px;
  height: 38px;
  font-size: 16px;
  cursor: pointer;
  background: transparent;
  user-select: none;
  color: black;
  overflow: hidden;
}
.confirm-filter-btn span {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: transparent;
  z-index: -1;
  border: 4px solid black;
}
.confirm-filter-btn span::before {
  content: "";
  position: absolute;
  width: 8%;
  height: 500%;
  background: white;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) rotate(-60deg);
  transition: all 0.3s;
}
.confirm-filter-btn:hover span::before {
  transform: translate(-50%, -50%) rotate(-90deg);
  width: 100%;
  background: black;
}
.confirm-filter-btn:hover {
  color: white;
}

.cancel-filter-btn {
  border: none;
  display: inline-block;
  position: relative;
  z-index: 0;
  padding: 8px 35.2px;
  height: 38px;
  font-size: 16px;
  cursor: pointer;
  background: transparent;
  user-select: none;
  color: white;
  overflow: hidden;
}
.cancel-filter-btn span {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: transparent;
  z-index: -1;
  border: 4px solid black;
}
.cancel-filter-btn span::before {
  content: "";
  position: absolute;
  width: 100%;
  height: 500%;
  background: black;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) rotate(-90deg);
  transition: all 0.3s;
}
.cancel-filter-btn:hover span::before {
  transform: translate(-50%, -50%) rotate(-60deg);
  width: 8%;
  background: white;
}
.cancel-filter-btn:hover {
  color: black;
}
/* #endregion 左侧筛选区域的确认和取消按钮 */

/* #region 每页数据的数量 */
.search-result__sort-right .per-page {
  border-right: .0625rem solid #d9d9d9;
  padding-right: .3125rem;
  display: inline-block;
  box-sizing: border-box;
  font-size: 16px;
  /* border: 1px solid black; */
}
.search-result__sort-right .per-page .per-page-label {
  padding: .3125rem 0;
  display: inline-block;
  box-sizing: border-box;
  font-weight: 600;
}
.search-result__sort-right .per-page ul {
  float: right;
  font-weight: 400;
}
.search-result__sort-right .per-page ul .page-size-chose.current {
  font-weight: 600;
}
.search-result__sort-right .per-page ul .page-size-chose {
  padding: .3125rem;
  box-sizing: border-box;
  cursor: pointer;
}
/* #endregion 每页数据的数量 */

/* #region 当前排序的类型 */
.search-result__sort-right .sort-type {
  float: right;
  position: relative;
  padding: 0 .5rem;
  /* font-size: 1.875rem; */
  /* font-family: "Microsoft YaHei", serif; */
}
.search-result__sort-right .sort-type .sort-type-btn {
  display: inline-block;
  position: relative;
  width: 200px;
  /* width: auto; */
  /* padding: .3125rem 0 1.25rem; */
  /* 这里主要是调整 Sort Type 和 Per Page 差不多高 */
  padding: 2px 0 0;
  margin: 0;
  line-height: 1.15;
  box-sizing: border-box;
  cursor: pointer;
  background-color: transparent;
  border: none;
  font-size: 14px;
  text-transform: none;
}
.search-result__sort-right .sort-type .sort-type-btn b {
  font-size: 16px;
  font-family: 'Times New Roman', Times, "Microsoft YaHei", serif;
  color: black;
  font-weight: 600;
}
.search-result__sort-right .sort-type .sort-type-btn span {
  font-size: 16px;
  font-family: 'Times New Roman', Times, "Microsoft YaHei", serif;
  color: black;
  font-weight: 300 !important;
}
.search-result__sort-right .sort-type.js--open .sort-type-btn i{
  transform: rotate(360deg);
}
/*
  VERY IMPORTANT
  transform 对于行内元素不起作用，
  要给i加上display:inline-block的样式转为行内块元素。
*/
.search-result__sort-right .sort-type .sort-type-btn i {
  display: inline-block;
  font-size: 1.625rem;
  /* font-size: .5rem; */
  margin-left: .3125rem;
  vertical-align: middle;
  padding-right: 0;
  transition: transform .5s;
  transform: rotate(180deg)
}

.search-result__sort-right .sort-type.js--open .sort-dropdown {
  display: block;
}
.search-result__sort-right .sort-type .sort-dropdown {
  display: none;
  position: absolute;
  right: 0;
  z-index: 9;
  text-align: left;
  width: 95%;
  padding: 0;
  background: #fff;
  /* border: .0625rem solid #d9d9d9; */
  border-top: .1875rem solid;
  font-size: 14px;
  min-width: 150px;
  box-shadow: 0 0.125rem 0.625rem rgb(82 82 82 / 43%);
  font-family: "Microsoft YaHei", serif;
}
@media (min-width: 768px) {
  .sort-dropdown {
    /* top: 55px; */
    top: 40px;
  }
}

.rlist {
  list-style: none;
  padding: 0;
  margin: 0;
}
.search-result__sort-right .sort-type .sort-dropdown .rlist li{
  padding: .375rem .9375rem;
  display: block;
  cursor: pointer;
  background-color: transparent;
  /* font-style: italic; */
  font-weight: 300;
}
.search-result__sort-right .sort-type .sort-dropdown .rlist li:hover {
  background-color: #d9d9d9;
}

/* #endregion 当前排序的类型 */

.result-item {
  width: 100%;
  display: inline-block;
  font-size: .875rem;
}



.search-result__pagination {
  margin-bottom: 1.875rem;
  margin-top: 1.25rem;
  text-align: center;
  font-size: 14px;
  box-sizing: border-box;
}
.search-result__pagination .pagination-container {
  width: 100%;
  height: 40px;
  box-sizing: border-box;
  /* border: 1px solid black; */
  padding: 0 auto;
  position: relative;
}

div.el-pagination {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}


/* #endregion 搜索结果区域结束 */

/* #region 响应式布局 */
/* 75rem = 1200px */
@media screen and (max-height: 75rem) {
  .filter-block-title {
    max-width: 9.375rem;
  }
}

@media (min-width: 1200px) {
  .result-content{
    max-width: 1310px;
    width: 100%;
  }
  .col-lg-1, .col-lg-2, .col-lg-3, .col-lg-4, .col-lg-5, .col-lg-6,
  .col-lg-7, .col-lg-8, .col-lg-9, .col-lg-10, .col-lg-11, .col-lg-12 {
    float: left;
  }
  .col-lg-3 {
    width: 25%;
  }
  .col-lg-9 {
    width: 75%;
  }
}
@media (min-width: 992px) and (max-width: 1200px) {
  .result-content{
    width: 960px;
  }
  .col-md-1, .col-md-2, .col-md-3, .col-md-4, .col-md-5, .col-md-6,
  .col-md-7, .col-md-8, .col-md-9, .col-md-10, .col-md-11, .col-md-12 {
    float: left;
  }
  .col-md-3 {
    width: 25%;
  }
  .col-md-9 {
    width: 75%;
  }
}
@media (min-width: 768px) and (max-width: 992px) {
  .result-content{
    width: 736px;
  }
  .col-sm-1, .col-sm-2, .col-sm-3, .col-sm-4, .col-sm-5, .col-sm-6,
  .col-sm-7, .col-sm-8, .col-sm-9, .col-sm-10, .col-sm-11, .col-sm-12 {
    float: left;
  }
  .col-sm-4 {
    width: 33.33333%;
  }
  .col-sm-8 {
    width: 66.66667%;
  }
}
@media (min-width: 532px) and (max-width: 768px) {
  .result-content{
    width: 100%;
  }
  .search-result__info {
    margin-top: 0;
  }
}
  /* #endregion 响应式布局结束 */

</style>
