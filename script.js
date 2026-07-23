const API =
"https://reycloud.legionteknologi.my.id/api/tiktok";

const urlInput = document.getElementById("url");
const downloadBtn = document.getElementById("download");

const loading = document.getElementById("loading");
const result = document.getElementById("result");
const galleryCard = document.getElementById("gallery-card");
const gallery = document.getElementById("gallery");

const cover = document.getElementById("cover");
const avatar = document.getElementById("avatar");
const nickname = document.getElementById("nickname");
const username = document.getElementById("username");
const caption = document.getElementById("caption");

const views = document.getElementById("views");
const likes = document.getElementById("likes");
const comments = document.getElementById("comments");
const shares = document.getElementById("shares");

const btnNowm = document.getElementById("btn-nowm");
const btnHd = document.getElementById("btn-hd");
const btnWm = document.getElementById("btn-wm");
const btnMusic = document.getElementById("btn-music");
const btnCover = document.getElementById("btn-cover");

let data = null;

downloadBtn.onclick = getTikTok;

urlInput.addEventListener("keydown", e => {

    if (e.key === "Enter")
        getTikTok();

});

async function getTikTok() {

    const url = urlInput.value.trim();

    if (!url)
        return toast("Masukkan URL TikTok.","error");

    loading.classList.remove("hidden");
    result.classList.add("hidden");
    galleryCard.classList.add("hidden");

    try {

        const req = await fetch(
            `${API}?url=${encodeURIComponent(url)}`
        );

        const json = await req.json();

        loading.classList.add("hidden");

        if (!json.success)
            return toast(json.message,"error");

        data = json.result;

        render();

        toast("Berhasil mengambil data.");

    } catch {

        loading.classList.add("hidden");

        toast("Gagal terhubung ke API.","error");

    }

}

function render() {

    result.classList.remove("hidden");

    cover.src = data.video.cover;

    avatar.src = data.author.avatar;

    nickname.textContent =
        data.author.nickname;

    username.textContent =
        "@" + data.author.username;

    caption.textContent =
        data.title;

    views.textContent =
        number(data.statistics.views);

    likes.textContent =
        number(data.statistics.likes);

    comments.textContent =
        number(data.statistics.comments);

    shares.textContent =
        number(data.statistics.shares);

    btnNowm.onclick = () =>
        open(data.video.no_watermark);

    btnHd.onclick = () =>
        open(data.video.hd);

    btnWm.onclick = () =>
        open(data.video.watermark);

    btnMusic.onclick = () =>
        open(data.music.url);

    btnCover.onclick = () =>
        open(data.video.cover);

    gallery.innerHTML = "";

    if (data.images &&
        data.images.length > 0) {

        galleryCard.classList.remove("hidden");

        data.images.forEach(url => {

            const img =
            document.createElement("img");

            img.src = url;

            img.onclick = () => open(url);

            gallery.appendChild(img);

        });

    }

}

function open(url){

    if(!url)
        return toast("Link tidak tersedia.","error");

    window.open(url,"_blank");

}

function number(x){

    return Number(x || 0)
    .toLocaleString("id-ID");

}

function toast(text,type="success"){

    const el =
    document.getElementById("toast");

    el.innerHTML = text;

    el.style.background =
        type=="error"
        ? "#dc2626"
        : "#16a34a";

    el.classList.add("show");

    setTimeout(()=>{

        el.classList.remove("show");

    },3000);

}
