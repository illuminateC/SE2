<template>
  <div class="result-item-card clearfix">
    <div class="result-item__citation">
      <div class="citation-heading">research-article</div>
      <!-- TODO 这里之后可以考虑改为形如 May 20, 2022 的形式 -->
      <div class="citation-date">{{ item.publication_date }}</div>
    </div>
    <div class="result-item__content">
      <!-- 论文的标题 -->
      <h5 class="card-title" @click="jumpToPaperPage(item.id?.slice(21))">
        <!-- 匹配高亮 -->
        <span
          v-if="item.display_name !== null"
          v-html="highlightText(item.display_name.replace(/<\/?i>/ig, ''))">
        </span>
        <span v-else>
          Title Unknown
        </span>
      </h5>

      <!-- 论文的作者列表 -->
      <ul class="card-author-list">
        <li v-for="(author) in item.authorships?.slice(0, 10)" :key="author">
          <!-- 跳转到对应的作者主页 -->
          <a @click="jumpToAuthorPage(author.author.id
            ? author.author.id.slice(21)
            : '')"
          >
            <img class="author-avator" src="https://dl.acm.org/pb-assets/icons/DOs/default-profile-1543932446943.svg"/>
            <span>{{ author.author.display_name }}</span>
          </a>
          <span>, </span>
        </li>
      </ul>

      <!-- 论文的信息：来源（期刊会议）host_venue、发行日期、类型、doi网址 -->
      <div class="card-simple-info" v-if="notInCollection">
        <!-- 跳转到对应的host_venue主页 -->
        <span
          class="epub-section__title"
          v-if="item.host_venue"
          @click="jumpToVenuePage(item.host_venue.id
            ? item.host_venue.id.slice(21)
            : '')"
        >
          {{ item.host_venue.display_name }}
        </span>
<!--        <span v-else>来源</span>-->
        <!-- 这里由于伪元素位置的影响，必须span里面嵌套一个span -->
        <span class="dot-separator">
          <span>{{ item.publication_date }},&nbsp;&nbsp;</span>
          <span>{{ item.type }}</span>
        </span>
        <span class="dot-separator" v-if="item.doi">
          <a style="vertical-align: middle;" :href="item.doi">{{ item.doi }}</a>
        </span>
      </div>

      <!-- 论文的内容摘要 -->
      <div class="card-abstract" v-if="notInCollection">
        <p v-if="item.abstract">摘要：{{ item.abstract }}</p>
        <p v-else>摘要：无</p>
      </div>

      <!-- 论文的领域concepts气泡展示，这里只截取前11个 -->
      <div class="card-concepts clearfix" v-if="notInCollection">
        <!-- 跳转到对应的concept主页 -->
        <div
          class="card-concepts-wrap"
          v-for="concept in item.concepts?.slice(0, 11)"
          :key="concept"
          @click="jumpToConceptPage(concept.id?.slice(21))"
        >
          <i class="iconfont icon-menu"></i>
          <div class="card-concept-context">{{ concept.display_name }}</div>
        </div>
      </div>

      <!-- 论文底部简略信息和快捷操作 -->
      <div class="card-footer clearfix">
        <!-- 论文底部简略信息 -->
        <div class="card-footer-left">
          <ul class="rlist--inline">
            <li class="metric-holder">
              <ul class="rlist--inline">
                <!-- 引用数量 -->
                <li>
                  <span class="citation">
                    <span style="color: #0f5de5">被引 {{ toThousands(item.cited_by_count) }}</span>
                  </span>
                </li>
                <!-- 下载数量 -->
                <li>
                  <span class="metric">
                    <span style="color: #0f5de5">下载 {{ toThousands(item["2022_cited_count"]) }}</span>
                  </span>
                </li>
              </ul>
            </li>
          </ul>
        </div>

        <!-- 论文底部快捷操作 -->
        <div class="card-footer-right">
          <ul class="rlist--inline" style="float: left;">
            <!-- 导出bibtex等引用格式 -->
            <li>
              <div class="card-tool-btn" @click="getBiBTeX(item), bibtexDialogVisible = true">
                <i class="iconfont icon-quotes" style="font-size: 1.1rem;"></i>
                <svg t="1702991271138" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4234" width="32" height="32"><path d="M712.533333 371.2l-128 128-59.733333-59.733333 128-128L597.333333 256l-42.666666-42.666667h256v256l-42.666667-42.666666-55.466667-55.466667zM657.066667 256H768v110.933333V256h-110.933333zM298.666667 298.666667v426.666666h426.666666v-256l85.333334 85.333334v256H213.333333V213.333333h256l85.333334 85.333334H298.666667z" fill="#444444" p-id="4235"></path></svg>
                <span class="card-btn-hint">
                  <span class="card-btn-hint-arrow"></span>
                  Export Citation
                </span>
              </div>
            </li>
            <!-- Bibtex 复制窗口 -->

            <!-- TODO 添加收藏夹的浮窗 -->
            <li v-if="notInCollection">
              <div class="card-tool-btn" @click="showFav">
                <svg t="1702991385863" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5485" width="32" height="32"><path d="M248.482281 938.000324c-4.306072 0-8.592702-1.336438-12.211113-3.967358-6.395664-4.646833-9.600659-12.521175-8.264221-20.314675l48.430012-282.363949L71.288626 431.382914c-5.66093-5.519714-7.698333-13.772678-5.255701-21.291932 2.444679-7.519254 8.943696-13.000082 16.768919-14.137998l283.508006-41.195238L493.099535 97.853655c3.498684-7.089465 10.720156-11.577686 18.627243-11.577686 7.907087 0 15.127536 4.489244 18.627243 11.577686l126.788661 256.904091 283.510052 41.195238c7.823176 1.137916 14.322194 6.618744 16.766872 14.137998 2.442632 7.519254 0.405229 15.773242-5.255701 21.291932L747.012502 631.354342l48.430012 282.363949c1.336438 7.7935-1.868557 15.667841-8.264221 20.314675-6.399757 4.646833-14.878872 5.257747-21.874193 1.582031L511.726777 802.298666 258.146385 935.614997C255.107165 937.211355 251.789607 938.000324 248.482281 938.000324zM130.422422 431.011454 313.25654 609.228415c4.894474 4.7727 7.128351 11.647271 5.974062 18.385742l-43.163055 251.64532 225.994104-118.811989c6.048763-3.180436 13.282514-3.180436 19.331277 0l225.992057 118.811989-43.163055-251.64532c-1.154289-6.738471 1.079588-13.613042 5.974062-18.385742l182.833095-178.216961-252.665557-36.71418c-6.767124-0.983397-12.614296-5.233188-15.641235-11.362792L511.726777 153.97893 398.729214 382.934482c-3.025916 6.129604-8.874111 10.379395-15.639189 11.362792L130.422422 431.011454z" fill="#272636" p-id="5486"></path></svg>
                <span class="card-btn-hint">
                  <span class="card-btn-hint-arrow"></span>
                  Add to Favor
                </span>
              </div>
            </li>
          </ul>

          <ul class="rlist--inline dot-separator" style="float: right;"
              v-if="(item.open_access?.is_oa === 1 || item.host_venue?.id || item.doi)">
            <!--
              跳转到PDF在线预览的网页
              open_access.is_oa
              -1  表示没有PDF
              0   表示有人已经提交PDF但是正在审核
              1   表示有PDF且审核通过
              -->
            <li v-if="(item.open_access?.is_oa === 1)">
              <div class="card-tool-btn pdf-btn" @click="jumpToPDFOnlinePage(item.open_access.oa_url)">
<!--                <i class="iconfont icon-pdf1" style="font-size: 0.9rem;"></i>-->
                <svg t="1702991456469" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6528" width="32" height="32"><path d="M234.666667 469.333333h85.333333a85.333333 85.333333 0 0 1 85.333333 85.333334v21.333333a85.333333 85.333333 0 0 1-85.333333 85.333333h-42.666667v85.333334h-42.666666V469.333333z m448 170.666667v106.666667h-42.666667V469.333333h149.333333v42.666667h-106.666666v85.333333h85.333333v42.666667h-85.333333zM618.666667 85.333333l277.333333 277.333334v490.645333A85.205333 85.205333 0 0 1 810.88 938.666667H213.12A85.333333 85.333333 0 0 1 128 853.333333V170.666667c0-47.125333 38.165333-85.333333 85.12-85.333334H618.666667z m-0.448 277.504h217.493333L618.666667 145.664l-0.448 217.173333zM853.333333 853.333333V405.333333H618.496c-23.466667 0-42.496-19.072-42.496-42.496V128H213.12C189.738667 128 170.666667 147.093333 170.666667 170.666667v682.666666c0 23.530667 19.093333 42.666667 42.453333 42.666667h597.76c23.424 0 42.453333-19.093333 42.453333-42.688zM426.666667 469.333333h64a106.666667 106.666667 0 0 1 106.666666 106.666667v64a106.666667 106.666667 0 0 1-106.666666 106.666667h-64V469.333333z m42.666666 234.666667h21.333334a64 64 0 0 0 64-64v-64a64 64 0 0 0-64-64h-21.333334v192z m-192-192v106.666667h42.666667a42.666667 42.666667 0 0 0 42.666667-42.666667v-21.333333a42.666667 42.666667 0 0 0-42.666667-42.666667h-42.666667z" fill="#3D3D3D" p-id="6529"></path></svg>
                <span class="card-btn-hint">
                  <span class="card-btn-hint-arrow"></span>
                  View PDF online
                </span>
              </div>
            </li>
            <!--
              跳转到论文源网页的超链接
                有论文所属机构的id（URL）时，跳转到对应URL
                没有时，跳转到 doi
             -->
            <li v-if="(item.host_venue?.id || item.doi)">
              <div
                class="card-tool-btn web-btn"
                @click="jumpToWorkSourceWeb(
                  item.host_venue.id
                    ? item.host_venue.id
                    : item.doi
                )"
              >
<!--                <i class="iconfont icon-signal-source" style="font-size: 1.3rem;"></i>-->
                <span class="card-btn-hint">
                  <span class="card-btn-hint-arrow"></span>
                  Get Access to Source Web
                </span>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
  <teleport to='body'>
    <!-- 蒙版 -->
    <transition name="fade">
      <div v-if="bibtexDialogVisible" class="dialog-container" @click="bibtexDialogVisible = false"></div>
    </transition>
    <!-- 浮窗 -->
    <transition name="up">
      <div v-if="bibtexDialogVisible" class="dialog-window">
        <!-- 标题 -->
        <div class="dialog-title">BiBTeX 引用格式</div>
        <!-- 文本 -->
        <div class="dialog-content" style="white-space: pre-wrap;">{{ bibtex }}</div>
        <!-- 按钮 -->
        <div class="dialog-btn-wrapper">
          <button class="dialog-cancel-btn" @click="bibtexDialogVisible = false" style="margin-right: 8px;">
            Cancel
            <span></span>
          </button>
          <button class="dialog-confirm-btn" @click="copy(bibtex)" style="margin-right: 8px;">
            {{ !copied ? 'CopyBib' : 'Copied!' }}
            <span></span>
          </button>
        </div>
      </div>
    </transition>
  </teleport>

  <teleport to='body'>
    <!-- 蒙版 -->
    <transition name="fade">
      <div v-if="favDialogVisible"
           class="dialog-container"
           @click="favDialogVisible = false"></div>
    </transition>
    <!-- 浮窗 -->
    <transition name="up" v-loading="favLoading">
      <div v-if="favDialogVisible" class="dialog-window">
        <!-- 标题 -->
        <div class="dialog-title">收藏此文献</div>
        <!-- 文本 -->
        <div v-if="collections.length != 0" class="dialog-content fav" style="white-space: pre-wrap;">
          <el-scrollbar max-height="400px">
            <el-checkbox
              v-for="(collection, index) in collections"
              :key="index"
              @change="favChanged(collection)"
              :checked="amInCol.find((col,idx,arr)=>{return col.package_id == collection.id})!=null"
              size="large"
              border
              style="width:90%;margin-bottom:20px;margin-left:20px"
            >
              <el-tag
                type="info"
                effect="light"
                round
              >{{ collection.sum }}
              </el-tag>
              &nbsp;&nbsp;&nbsp;
              {{ collection.name }}

            </el-checkbox>
          </el-scrollbar>
        </div>
        <div v-else>
          您还没有创建收藏夹。
        </div>
        <!-- 按钮 -->
        <div class="dialog-btn-wrapper">
          <button class="dialog-cancel-btn" @click="favDialogVisible = false" style="margin-right: 8px;">
            取消
            <span></span>
          </button>
          <button class="dialog-confirm-btn" @click="likeIt();favDialogVisible = false" style="margin-right: 8px;">
            确定
            <span></span>
          </button>
        </div>
      </div>
    </transition>
  </teleport>

</template>

<script setup>
import {ref} from 'vue';
import {useRouter} from 'vue-router';
import {useClipboard} from '@vueuse/core';
import {highlightText, toThousands} from '@/utils';
import {Collection} from '@/api/collect';
import {Download, Star, StarFilled} from "@element-plus/icons-vue";

const router = useRouter();
const props = defineProps({
  item: {
    type: Object,
    required: true
  },
  notInCollection: {
    type: Boolean,
    default: true,
  }
});

// #region 卡片内部交互函数

/**
 * 跳转到论文详情页
 * item.id用于跳转到论文详情页---W2171852244 √
 * @param {String} openAlexPaperId 论文的openAlexId
 */
const jumpToPaperPage = (openAlexPaperId) => {
  console.log(openAlexPaperId);
  // router.push({
  //   name: "PaperDetail",
  //   params: {paperid: openAlexPaperId}
  // });
  if (openAlexPaperId) {
    const newPage = router.resolve({
      name: "PaperDetail",
      params: {paperid: openAlexPaperId},
    });
    window.open(newPage.href, '_blank');
  }
};

/**
 * 跳转到作者详情页
 * 每一个item.authorships[i].author.id用于跳转到作者详情页---A2164292938 √
 * @param {String} openAlexAuthorId 作者的openAlexId
 */
const jumpToAuthorPage = (openAlexAuthorId) => {
  console.log(openAlexAuthorId);
  if (openAlexAuthorId) {
    const newPage = router.resolve({
      name: 'OpenAlexAuthorDetail',
      params: {tokenid: openAlexAuthorId},
    });
    window.open(newPage.href, '_blank');
  }
};

/**
 * 跳转到期刊详情页
 * item.host_venue.id用于跳转到期刊-- V1983995261 √
 * （这个可能host_venue整个为空，也可能只有这个字段为空）
 * @param {String} openAlexVenueId 作为论文来源的期刊/会议的openAlexId
 */
const jumpToVenuePage = (openAlexVenueId) => {
  console.log(openAlexVenueId);
  if (openAlexVenueId) {
    const newPage = router.resolve({
      name: 'JournalDetail',
      params: {journalid: openAlexVenueId},
    });
    window.open(newPage.href, '_blank');
  }
};

/**
 * 跳转到领域详情页
 * 每一个item.concept[i].id用于跳转到领域详情页-- C2778805511 √
 * @param {String} openAlexConceptId 论文领域的openAlexId
 */
const jumpToConceptPage = (openAlexConceptId) => {
  console.log(openAlexConceptId);
  if (openAlexConceptId) {
    const newPage = router.resolve({
      name: 'ConceptDetail',
      params: {tokenid: openAlexConceptId},
    });
    window.open(newPage.href, '_blank');
  }
};

/**
 * 跳转到PDF在线预览网页
 * @param {String[URL]} pdfURL PDF在线预览网页
 */
const jumpToPDFOnlinePage = (pdfURL) => {
  // console.log(pdfURL);
  window.open(pdfURL, '_blank');
  // window.location.href = pdfURL;
};

/**
 * 跳转到论文源网址
 * @param {String[URL]} webURL 论文源网址
 */
const jumpToWorkSourceWeb = (webURL) => {
  // console.log(webURL);
  window.open(webURL, '_blank');
  // window.location.href = webURL;
};

// #endregion 卡片内部交互函数

// bibtex
const bibtex = ref("");
const {copy, copied} = useClipboard({bibtex})
const bibtexDialogVisible = ref(false);
const getBiBTeX = (paperInfo) => {
  // 需要的字段有
  // 文章的标题 work.display_name
  // 文章的作者 work.authorships 对其中每条 authorship.author.display_name
  // 文章的journal host_venue.display_name
  // 文章的出版年份 work.publication_year
  const {display_name, authorships, publication_year, host_venue} = paperInfo;
  const author = authorships.map((authorship) => {
    return authorship.author.display_name;
  });
  const journal = host_venue.display_name;
  bibtex.value = `@article{${display_name},
    author = {${author}},
    title = {${display_name}},
    journal = {${journal}},
    year = {${publication_year}},
  }`;
  console.log(bibtex.value);
  return bibtex.value;
};

// 收藏
const favDialogVisible = ref(false)
const favLoading = ref(true)
const collections = ref([])
const amInCol = ref([])
var changedCollection = []

async function showFav() {
  changedCollection = []
  collections.value = []
  amInCol.value = []
  favLoading.value = true
  favDialogVisible.value = true
  const t1 = (await Collection.GetCollectionListByPaper({"work_id": props.item.id.substring(21)})).data.package_list
  amInCol.value = t1 ? t1 : []
  const t2 = (await Collection.GetCollection()).data.package_list
  collections.value = t2 ? t2 : []
  favLoading.value = false
}

const favChanged = (which) => {
  var i = -1
  if (i === changedCollection.find((col, idx, arr) => {
    return col.id === which.id
  })) {
    changedCollection.splice(i, 1);
  } else {
    changedCollection.push(which);
  }
}
const likeIt = () => {
  for (const cc of changedCollection) {
    console.log(amInCol.value, cc)
    if (amInCol.value.find((col, idx, arr) => {
      return col.package_id === cc.id
    })) {
      Collection.CancelDocument({
        work_id_list: [props.item.id.substring(21)],
        package_id: cc.id
      })
        .then((res) => {
          ElNotification({
            title: "取消收藏成功",
            message: "成功将" + props.item.display_name + "移出收藏夹",
            type: "success",
            duration: 1000
          });
          favLoading.value = true;
        })
    } else {
      Collection.AddDocument({
        work_id: props.item.id.substring(21),
        package_id: cc.id
      })
        .then((res) => {
          ElNotification({
            title: "收藏成功",
            message: "成功将" + props.item.display_name + "加入收藏夹",
            type: "success",
            duration: 1000
          })
          favLoading.value = true;
        });
    }
  }
}
</script>
<style scoped>
/* #region 通用样式 */
* {
  box-sizing: border-box;
  line-height: 1.4;
  word-wrap: break-word;
  text-size-adjust: 100%;
}

a,
a:hover,
a:focus {
  color: inherit;
  text-decoration: none;
  background-color: transparent;
}

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

.rlist--inline > li {
  display: inline-block;
}

/* #endregion 通用样式结束 */

/* #region 对话框 */
.fade-enter-active,
.fade-leave-active {
  transition: all v-bind(closeDuration);
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.up-enter-active,
.up-leave-active {
  transition: all v-bind(closeDuration);
}

.up-enter-from,
.up-leave-to {
  opacity: 0;
  transform: translate3d(-50%, 100px, 0);
}

.dialog-container {
  width: 100vw;
  height: 100vh;
  /* background-color: rgb(24 24 27 / 0.8); */
  background-color: rgba(255, 255, 255, 0.6);
  position: fixed;
  z-index: 9999;
  top: 0;
  left: 0;
}

.dialog-window {
  width: 80%;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 10000;
  padding: 6px 8px;
  border-radius: 2px;
  border: 4px solid black;
  cursor: pointer;
  background-color: white;
}

@media (min-width: 1280px) {
  .dialog-window {
    width: 35%;
  }
}

.dark.dialog-window {
  background-color: rgb(39 39 42);
  border-color: rgb(82 82 91);
}

.dialog-title {
  font-size: 22px;
  line-height: 26px;
  font-weight: 700;
  margin-bottom: 20px;
}

.dark.dialog-title {
  color: rgb(228 228 231);
}

.dialog-content {
  font-size: 16.8px;
  line-height: 20.8px;
  color: rgb(24 24 27);
  margin-bottom: 20px;
  font-weight: 500;
}

.dark.dialog-content {
  color: rgb(228 228 231);
}

.dialog-btn-wrapper {
  display: flex;
  justify-content: flex-end;
}

.dialog-confirm-btn {
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

.dialog-confirm-btn span {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: transparent;
  z-index: -1;
  border: 4px solid black;
}

.dialog-confirm-btn span::before {
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

.dialog-confirm-btn:hover span::before {
  transform: translate(-50%, -50%) rotate(-90deg);
  width: 100%;
  background: black;
}

.dialog-confirm-btn:hover {
  color: white;
}

.dialog-cancel-btn {
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

.dialog-cancel-btn span {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: transparent;
  z-index: -1;
  border: 4px solid black;
}

.dialog-cancel-btn span::before {
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

.dialog-cancel-btn:hover span::before {
  transform: translate(-50%, -50%) rotate(-60deg);
  width: 8%;
  background: white;
}

.dialog-cancel-btn:hover {
  color: black;
}

/* #endregion 对话框 */
.result-item-card {
  /* 30px */
  margin-left: 1.875rem;
  /* 15px */
  margin-top: .9375rem;
  padding: .9375rem;
  box-shadow: 0 0.3125rem 0.5rem rgb(0 0 0 / 10%);
  background: #fff;
  word-break: break-word;
}

.result-item__citation {
  vertical-align: top;
  /* 12px */
  font-size: .75rem;
  text-transform: uppercase;
}

@media (min-width: 768px) {
  .result-item__citation {
    width: 8.75rem;
    display: inline-block;
    margin-bottom: 0;
  }
}

.citation-heading {
  margin-top: .25rem;
  margin-right: .625rem;
  font-weight: 600;
}

.citation-date {
  display: inline-block;
  color: #757575;
  margin-bottom: .25rem;
  font-size: .75rem;
  font-weight: 400;
  text-transform: capitalize;
}

.result-item__content {
  display: inline-block;
}

@media (min-width: 992px) {
  .result-item__content {
    width: calc(100% - 8.75rem);
    float: right;
  }
}

.card-title {
  color: #0077c2;
  font-weight: 500;
  font-family: 'Times New Roman', Times, "Microsoft YaHei", serif;
  font-size: 1.25rem;
  margin-bottom: .625rem;
  cursor: pointer;
}

.card-author-list {
  list-style: none;
  height: auto;
  padding: 0;
  margin: 0 0 .625rem;
  color: #6b6b6b;
  font-size: .875rem;
}

.card-author-list > li:not(:last-child) {
  margin-right: .3125rem;
}

.card-author-list > li {
  display: inline-block;
  line-height: 2rem;
}

.card-author-list a {
  text-decoration: underline;
  color: inherit;
  cursor: pointer;
  background-color: transparent;
}

.card-author-list img {
  filter: grayscale(100%);
  transition: all .2s ease-in-out;
}

img {
  max-width: 100%;
  border-style: none;
}

.author-avator {
  width: 1.5rem;
  height: 1.5rem;
  margin-right: .3125rem;
  box-sizing: content-box;
  vertical-align: middle;
  padding-right: 0;
  border-radius: 50%;
  object-fit: cover;
  object-position: top;
}

.card-simple-info {
  color: #6b6b6b;
  margin: .625rem 0;
  box-sizing: border-box;
}

.card-simple-info span {
  display: inline-block;
  vertical-align: middle;
}

.card-simple-info .epub-section__title {
  font-size: 14px;
  box-sizing: border-box;
  cursor: pointer;
}

.card-abstract {
  height: auto;
  margin: 0.9rem 0;
  font-size: 1rem;
  font-family: 'Times New Roman', Times, "Microsoft YaHei", serif;
  /* FIXME 下面四行一起用可以实现多行溢出文本用省略号 "..." 代替，保证不超过一行 */
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 4;
}

.card-concepts {
  height: auto;
  margin-bottom: .8rem;
}

.card-concepts .card-concepts-wrap {
  float: left;
  margin-right: 10px;
  margin-bottom: 5px;
  padding: 3px 5px;
  box-sizing: border-box;
  border: 1.6px solid black;
  border-radius: 5px;
  font-size: 14px;
  cursor: pointer;
}

.card-concepts .card-concepts-wrap i {
  display: inline-block;
  margin-right: 3px;
}

.card-concepts .card-concepts-wrap .card-concept-context {
  display: inline-block;
  text-transform: capitalize;
}

.card-footer {
  height: auto;
}

/* #region 卡片底部左侧简略信息 */
.card-footer-left {
  float: left;
}

.card-footer-left li {
  /* 6px */
  padding-right: .375rem;
}

.card-footer-left > ul > li {
  vertical-align: text-top;
}

@media (min-width: 533px) {
  .card-footer-left > ul > li {
    border-right: .0625rem solid #d9d9d9;
    margin-right: .4375rem;
  }
}

.metric-holder {
  outline: none;
  position: relative;
  display: inline-block;
  font-weight: 600;
}

.card-footer-left .citation {
  color: #0077c2;
}

.card-footer-left .metric {
  color: #651fff;
}

.card-footer-left li i {
  padding-right: .375rem;
  vertical-align: sub;
  transition: transform .5s;
}

/* #endregion 卡片底部左侧简略信息结束 */

/* #region 卡片底部右侧快捷操作 */
.card-footer-right {
  float: right;
}

/**
  这里因为上面规定了 .rlist--inline li 元素是 display:inline-block;
  vertical-align 用来指定行内元素（inline）或表格单元格（table-cell）元素的垂直对齐方式。
*/
.card-footer-right .rlist--inline li {
  vertical-align: middle;
  position: relative;
}

/* #region 单个底部工具按钮+下拉栏 */
.card-footer-right .rlist--inline li .card-tool-btn:hover {
  background-color: #d7d7d7;
  cursor: pointer;
}

.card-footer-right .rlist--inline li .card-tool-btn {
  position: relative;
  display: inline-block;
  /* 32px */
  width: 2rem;
  height: 2rem;
  line-height: 1.75rem;
  padding: 0;
  margin: 0 3px;
  font-size: 17px;
  border-radius: 2px;
  color: #6b6b6b;
  background: #f0f0f0;

  display: inline-block;
  white-space: nowrap;
  text-align: center;
  vertical-align: middle;
}

.card-footer-right .rlist--inline li .card-tool-btn.pdf-btn:hover {
  /* background-color: #d44848; */
  background-color: #e34444;
}

.card-footer-right .rlist--inline li .card-tool-btn.pdf-btn {
  background-color: #d40c03;
  color: white;
}

.card-footer-right .rlist--inline li .card-tool-btn.web-btn:hover {
  background-color: #319ddf;
}

.card-footer-right .rlist--inline li .card-tool-btn.web-btn {
  background-color: #0077c2;
  color: white;
}

.card-footer-right .rlist--inline li .card-tool-btn i {
  vertical-align: middle;
  padding-right: 0;
}

.card-footer-right .rlist--inline li:hover .card-tool-btn .card-btn-hint {
  display: inline-block;
}

.card-footer-right .rlist--inline li .card-tool-btn .card-btn-hint {
  display: none;
  position: absolute;
  top: calc(2rem + 0.8rem);
  left: 50%;
  transform: translate(-50%, 0);
  background: #6b6b6b;
  padding: 10px 15px;
  color: #fff;
  border-radius: 3px;
  font-size: 14px;
  line-height: 20px;
  z-index: 9020;
  max-width: 300px;
}

/*
  经典的利用 宽度高度为0，边框宽度不为0，形成三角形
*/
.card-footer-right .rlist--inline li:hover .card-tool-btn .card-btn-hint .card-btn-hint-arrow {
  display: inline-block;
}

.card-footer-right .rlist--inline li .card-tool-btn .card-btn-hint .card-btn-hint-arrow {
  display: none;
  width: 0;
  height: 0;
  border: .625rem solid #6b6b6b;
  transform: rotate(45deg);
  position: absolute;
  top: -.1875rem;
  left: calc(50% - .625rem);
  z-index: -1;
}

/* #endregion 单个底部工具按钮+下拉栏 结束 */

.dot-separator::before {
  color: #6b6b6b;
  content: "•";
  padding-right: 5px;
  padding-left: 5px;
  font-weight: 600;
  font-size: 19px;
  vertical-align: middle;
  box-sizing: border-box;
}

/* #endregion 卡片底部右侧快捷操作 */

:deep(.fav .el-checkbox__inner) {
  background-color: #fff;
}

:deep(.fav .el-checkbox__input.is-checked .el-checkbox__inner) {
  background-color: black;
  border-color: black;
}

:deep(.fav .el-checkbox__inner:hover) {
  border-color: black;
}

:deep(.fav .el-checkbox__input.is-checked+.el-checkbox__label) {
  color: black;
  font-weight: bold;
}

:deep(.fav .el-checkbox.is-bordered.is-checked) {
  border-color: black;
}

/* #endregion 收藏弹窗 */

</style>
