package Elyadata.Screen_Recording.Screen_Recording;
import com.azure.storage.blob.BlobClient;
import com.azure.storage.blob.BlobContainerClient;
import com.azure.storage.blob.BlobServiceClient;
import com.azure.storage.blob.models.BlobItem;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;
import org.springframework.http.MediaType;


@RestController
@RequestMapping("video")
//@AllArgsConstructor
public class VideoController {
    @Autowired
    private BlobServiceClient blobServiceClient;

    @PostMapping(value = "/upload", produces = MediaType.APPLICATION_JSON_VALUE)
    public String uploadVideo(@RequestParam("file") MultipartFile file) {
        try {
            BlobContainerClient containerClient = blobServiceClient.getBlobContainerClient("videos");
            BlobClient blobClient = containerClient.getBlobClient(file.getOriginalFilename());
            blobClient.upload(file.getInputStream(), file.getSize());

            return "{\"message\": \"Video uploaded successfully!\"}"; // Return a JSON response
        } catch (Exception e) {
            // Handle exception
            throw new RuntimeException("Failed to upload video."); // Throw an exception to indicate failure
        }
    }

//    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
//    @ExceptionHandler(RuntimeException.class)
//    public String handleUploadException(RuntimeException ex) {
//        return "{\"message\": \"Failed to upload video.\"}"; // Return a JSON response with appropriate error message
//    }

@GetMapping("/videoBlobStorage")
public List<String> getAllVideos() {
    List<String> videoUrls = new ArrayList<>();
    BlobContainerClient containerClient = blobServiceClient.getBlobContainerClient("videos");

    for (BlobItem blobItem : containerClient.listBlobs()) {
        String videoUrl =  blobItem.getName();
        videoUrls.add(videoUrl);
    }

    return videoUrls;
}

    @GetMapping("/{videoName}")
    public ResponseEntity<byte[]> getVideo(@PathVariable String videoName) throws IOException {
        BlobContainerClient containerClient = blobServiceClient.getBlobContainerClient("videos");

        BlobClient blobClient = containerClient.getBlobClient(videoName);
        InputStream blobInputStream = blobClient.openInputStream();

        ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
        byte[] buffer = new byte[4096];
        int bytesRead;
        while ((bytesRead = blobInputStream.read(buffer)) != -1) {
            outputStream.write(buffer, 0, bytesRead);
        }

        byte[] videoBytes = outputStream.toByteArray();

        // Set the appropriate content type for the video
        String contentType = "video/webm";

        return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType(contentType))
                .body(videoBytes);
    }

    @GetMapping("/test")
    public String TestBack() {
        return "test";
    }
    @GetMapping("/hello")
    public String TestHello() {
        return "hello";
    }

}

