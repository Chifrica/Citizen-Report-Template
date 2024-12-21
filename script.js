document.addEventListener('DOMContentLoaded', function() {
    const photoPreview = document.getElementById('photoPreview');
    const uploadPhotoBtn = document.getElementById('uploadPhotoBtn');

    let photoFile = null;

    //upload photo

    uploadPhotoBtn.addEventListener('click', () => {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*';
        input.onchange = (e) => {
            photoFile = e.target.files[0]
            const img = document.createElement('img');
            img.src = URL.createObjectURL(photoFile);
            photoPreview.innerHTML = '';
            photoPreview.appendChild(img);
        }
        input.click();
    });
})