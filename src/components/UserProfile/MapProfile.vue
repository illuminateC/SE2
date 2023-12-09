<template>
    <div class="right-box">
        <div class="right">
            <div class="map-box">
                <p>here is a map</p>
                <div class="map">此处应有图片</div>
            </div>
            <div class="article-box">
                <div class="grid-item">
                    <div class="grid-head">
                        <p>我的投稿</p>
                        <div class="all">全部</div>
                    </div>
                    <div class="article-container">
                        <div>
                            <p>这是第一个</p>
                            <p href="a">xxxx</p>
                        </div>
                        <div>2</div>
                        <div>3</div>
                    </div>
                </div>
                <div class="grid-item">
                    <div class="grid-head">
                        <p>我的收藏</p>
                        <div class="all">全部</div>
                    </div>
                    <div class="article-container">
                        <div>1</div>
                        <div>2</div>
                        <div>3</div>
                    </div>
                </div>

            </div>
        </div>

    </div>
</template>

<script>
export default {

}
</script>

<style  scoped>
.right-box {
    /* margin: 0 0 0 50% */
    display: flex;

    .right {
        margin-left: 2vw;

        width: 90%;

        .map-box {
            height: 20vh;

        }

        .map-box p {
            font-weight: 700;
            font-style: italic;
            font-size: larger;
        }

        .article-box {
            height: 40vh;
            display: grid;
            grid-template-rows: repeat(2, 1fr);
            grid-gap: 20px;


            .grid-item {
                background-color: aliceblue;
                border-radius: 5px;
                display: flex;
                flex-flow: column wrap;

                .grid-head {
                    display: flex;

                    .all {
                        margin-left: auto;
                    }
                }
            }

            .article-container {
                flex-grow: 1;
                display: grid;
                grid-template-rows: repeat(3, 1fr);
            }
        }

    }
}
</style>