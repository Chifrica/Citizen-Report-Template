document.addEventListener('DOMContentLoaded', () => {
    const photoPreview = document.getElementById('photoPreview');
    const uploadPhotoBtn = document.getElementById('uploadPhotoBtn');
    const capturePhotoBtn = document.getElementById('capturePhotoBtn');
    const videoPreview = document.getElementById('videoPreview');
    const recordVideoBtn = document.getElementById('recordVideoBtn');
    const stopVideoBtn = document.getElementById('stopVideoBtn');

    let photoFile = null;
    let videoStream = null;
    let mediaRecorder = null;
    let videoChunks = [];

    // Upload photo
    uploadPhotoBtn.addEventListener('click', () => {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*';
        input.onchange = (e) => {
            photoFile = e.target.files[0];
            const img = document.createElement('img');
            img.src = URL.createObjectURL(photoFile);
            photoPreview.innerHTML = '';
            photoPreview.appendChild(img);
        }
        input.click();
    });

    // Capture photo
    capturePhotoBtn.addEventListener('click', async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true });
            const video = document.createElement('video');
            video.srcObject = stream;
            video.play();
            photoPreview.innerHTML = '';
            photoPreview.appendChild(video);

            const captureButton = document.createElement('button');
            captureButton.textContent = 'Capture';
            captureButton.classList.add('btn');
            photoPreview.appendChild(captureButton);

            captureButton.addEventListener('click', () => {
                const canvas = document.createElement('canvas');
                canvas.width = video.videoWidth;
                canvas.height = video.videoHeight;
                const context = canvas.getContext('2d');
                context.drawImage(video, 0, 0, canvas.width, canvas.height);
                const img = document.createElement('img');
                img.src = canvas.toDataURL('image/png');
                photoPreview.innerHTML = '';
                photoPreview.appendChild(img);
                stream.getTracks().forEach(track => track.stop());
            });
        } catch (err) {
            console.error('Error accessing camera:', err);
        }
    });

    // Record video
    recordVideoBtn.addEventListener('click', async () => {
        try {
            videoStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
            const video = document.createElement('video');
            video.srcObject = videoStream;
            video.play();
            videoPreview.innerHTML = '';
            videoPreview.appendChild(video);
            
            mediaRecorder = new MediaRecorder(videoStream);
            mediaRecorder.ondataavailable = (e) => {
                if (e.data.size > 0) {
                    videoChunks.push(e.data);
                }
            };
            mediaRecorder.onstop = () => {
                const videoBlob = new Blob(videoChunks, { type: 'video/mp4' });
                const videoUrl = URL.createObjectURL(videoBlob);
                const videoElement = document.createElement('video');
                videoElement.controls = true;
                videoElement.src = videoUrl;
                videoPreview.innerHTML = '';
                videoPreview.appendChild(videoElement);
                videoChunks = [];
                videoStream.getTracks().forEach(track => track.stop());
            };
            mediaRecorder.start();
            stopVideoBtn.disabled = false;
        } catch (err) {
            console.error('Error accessing camera:', err);
        }
    });

    stopVideoBtn.addEventListener('click', () => {
        if (mediaRecorder && mediaRecorder.state !== 'inactive') {
            mediaRecorder.stop();
            stopVideoBtn.disabled = true;
        }
    });

    // Submit form
    document.getElementById('reportForm').addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Report submitted successfully!');
    });
});



// document.addEventListener('DOMContentLoaded', () => {
//     const photoPreview = document.getElementById('photoPreview');
//     const uploadPhotoBtn = document.getElementById('uploadPhotoBtn');
//     const capturePhotoBtn = document.getElementById('capturePhotoBtn');
//     const videoPreview = document.getElementById('videoPreview');
//     const recordVideoBtn = document.getElementById('recordVideoBtn');
//     const stopVideoBtn = document.getElementById('stopVideoBtn');

//     let photoFile = null;
//     let videoStream = null;
//     let mediaRecorder = null;
//     let videoChunks = [];

//     // Upload photo
//     uploadPhotoBtn.addEventListener('click', () => {
//         const input = document.createElement('input');
//         input.type = 'file';
//         input.accept = 'image/*';
//         input.onchange = (e) => {
//             photoFile = e.target.files[0];
//             const img = document.createElement('img');
//             img.src = URL.createObjectURL(photoFile);
//             photoPreview.innerHTML = '';
//             photoPreview.appendChild(img);
//         }
//         input.click();
//     });

//     // Capture photo
//     capturePhotoBtn.addEventListener('click', async () => {
//         try {
//             const stream = await navigator.mediaDevices.getUserMedia({ video: true });
//             const video = document.createElement('video');
//             video.srcObject = stream;
//             video.play();
//             photoPreview.innerHTML = '';
//             photoPreview.appendChild(video);

//             const captureButton = document.createElement('button');
//             captureButton.textContent = 'Capture';
//             captureButton.classList.add('btn');
//             photoPreview.appendChild(captureButton);

//             captureButton.addEventListener('click', () => {
//                 const canvas = document.createElement('canvas');
//                 canvas.width = video.videoWidth;
//                 canvas.height = video.videoHeight;
//                 const context = canvas.getContext('2d');
//                 context.drawImage(video, 0, 0, canvas.width, canvas.height);
//                 const img = document.createElement('img');
//                 img.src = canvas.toDataURL('image/png');
//                 photoPreview.innerHTML = '';
//                 photoPreview.appendChild(img);
//                 stream.getTracks().forEach(track => track.stop());
//             });
//         } catch (err) {
//             console.error('Error accessing camera:', err);
//         }
//     });

//     // Record video
//     recordVideoBtn.addEventListener('click', async () => {
//         try {
//             videoStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
//             mediaRecorder = new MediaRecorder(videoStream);
//             mediaRecorder.ondataavailable = (e) => {
//                 if (e.data.size > 0) {
//                     videoChunks.push(e.data);
//                 }
//             };
//             mediaRecorder.onstop = () => {
//                 const videoBlob = new Blob(videoChunks, { type: 'video/mp4' });
//                 const videoUrl = URL.createObjectURL(videoBlob);
//                 const videoElement = document.createElement('video');
//                 videoElement.controls = true;
//                 videoElement.src = videoUrl;
//                 videoPreview.innerHTML = '';
//                 videoPreview.appendChild(videoElement);
//                 videoChunks = [];
//                 videoStream.getTracks().forEach(track => track.stop());
//             };
//             mediaRecorder.start();
//             videoPreview.innerHTML = '<span>Recording...</span>';
//             stopVideoBtn.disabled = false;
//         } catch (err) {
//             console.error('Error accessing camera:', err);
//         }
//     });

//     stopVideoBtn.addEventListener('click', () => {
//         if (mediaRecorder && mediaRecorder.state !== 'inactive') {
//             mediaRecorder.stop();
//             stopVideoBtn.disabled = true;
//         }
//     });

//     // Submit form
//     document.getElementById('reportForm').addEventListener('submit', (e) => {
//         e.preventDefault();
//         alert('Report submitted successfully!');
//     });
// });
