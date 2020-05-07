package com.example.androidclient;

import androidx.annotation.NonNull;
import androidx.appcompat.app.ActionBarDrawerToggle;
import androidx.appcompat.app.AppCompatActivity;
import androidx.drawerlayout.widget.DrawerLayout;

import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.graphics.drawable.Drawable;
import android.os.AsyncTask;
import android.os.Bundle;
import android.util.Log;
import android.view.MenuItem;
import android.widget.ImageView;
import android.widget.TextView;
import android.widget.Toast;
import android.widget.VideoView;

import com.example.androidclient.ui.PaginaInicio;
import com.google.android.material.navigation.NavigationView;
import com.google.gson.Gson;

import java.io.BufferedInputStream;
import java.io.BufferedOutputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import java.util.List;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;
import retrofit2.Retrofit;
import retrofit2.converter.gson.GsonConverterFactory;
import retrofit2.http.GET;

public class MainActivity extends AppCompatActivity {
    public static final String API_URI = "http://192.168.0.26:3000";
    private static final int IO_BUFFER_SIZE = 4*1024;
    private static final String TAG ="" ;
    private DrawerLayout dl;
    private ActionBarDrawerToggle abdt;
    TextView mision,vision,about,eslogan;
    ImageView logo;
    VideoView video;
    URL url;
    HttpURLConnection http;
    PaginaInicio paginaInicio;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        paginaInicio = new PaginaInicio();
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        logo = (ImageView)findViewById(R.id.iv_logo);
        video = (VideoView)findViewById(R.id.vv_video);
        eslogan= (TextView)findViewById(R.id.tv_eslogan);
        mision = (TextView)findViewById(R.id.tv_mision);
        vision= (TextView)findViewById(R.id.tv_vision);
        about  = (TextView)findViewById(R.id.tv_about);
        dl = (DrawerLayout)findViewById(R.id.dl);


        abdt = new ActionBarDrawerToggle(this,dl,R.string.Open,R.string.Close);
        abdt.setDrawerIndicatorEnabled(true);
        dl.addDrawerListener(abdt);
        abdt.syncState();

        getSupportActionBar().setDisplayHomeAsUpEnabled(true);

        final NavigationView nav_view = (NavigationView)findViewById(R.id.nav_view);



        nav_view.setNavigationItemSelectedListener(new NavigationView.OnNavigationItemSelectedListener() {
            @Override
            public boolean onNavigationItemSelected(@NonNull MenuItem menuItem) {
                int id = menuItem.getItemId();
                if(id==R.id.menu_inicio){
                    Toast.makeText(MainActivity.this,"menu_inicio",Toast.LENGTH_LONG);
                }else if(id==R.id.menu_login){
                    Toast.makeText(MainActivity.this,"menu_login",Toast.LENGTH_LONG);
                }else if(id==R.id.menu_registro){
                    Toast.makeText(MainActivity.this,"menu_registro",Toast.LENGTH_LONG);
                }
                return false;
            }
        });
        getPosts();
    }

    @Override
    public boolean onOptionsItemSelected(@NonNull MenuItem item) {
        return abdt.onOptionsItemSelected(item)||super.onOptionsItemSelected(item);
    }
    public interface PostService{
        String API_Route = "/home";
        @GET(API_Route)
        Call<List<PaginaInicio>> getPost();
    }
    private void getPosts(){
        Retrofit retrofit = new Retrofit.Builder()
                .baseUrl(API_URI)
                .addConverterFactory(GsonConverterFactory.create())
                .build();
        PostService postService = retrofit.create(PostService.class);
        Call<List<PaginaInicio>> call = postService.getPost();
        call.enqueue(new Callback<List<PaginaInicio>>() {
            @Override
            public void onResponse(Call<List<PaginaInicio>> call, Response<List<PaginaInicio>> response) {
                for(PaginaInicio pi :response.body()){
                    Log.d("transporte",pi.toString());
                    eslogan.setText(pi.getEslogan());
                    about.setText(pi.getAbout());
                    new DownloadImageTask((ImageView)findViewById(R.id.iv_logo))
                            .execute("http://localhost:3000/uploads/"+pi.getImagen());
                    video.setVideoPath("http://localhost:3000/uploads/"+pi.getVideo());
                    video.start();

                }
            }

            @Override
            public void onFailure(Call<List<PaginaInicio>> call, Throwable t) {

            }
        });
    }
//    public static Bitmap loadBitmap(String url) throws IOException {
//        Bitmap bitmap = null;
//        InputStream in = null;
//        BufferedOutputStream out = null;
//
//        try {
//            in = new BufferedInputStream(new URL(url).openStream(), IO_BUFFER_SIZE);
//
//            final ByteArrayOutputStream dataStream = new ByteArrayOutputStream();
//            out = new BufferedOutputStream(dataStream, IO_BUFFER_SIZE);
//            bitmap.copy(in,out);
//            out.flush();
//
//            final byte[] data = dataStream.toByteArray();
//            BitmapFactory.Options options = new BitmapFactory.Options();
//            //options.inSampleSize = 1;
//
//            bitmap = BitmapFactory.decodeByteArray(data, 0, data.length,options);
//        } catch (IOException e) {
//            Log.e(TAG, "Could not load Bitmap from: " + url);
//        } finally {
//            in.close();
//            out.close();
//        }
//
//        return bitmap;
//    }
    private class DownloadImageTask extends AsyncTask<String, Void, Bitmap> {
        ImageView bmImage;

        public DownloadImageTask(ImageView bmImage) {
            this.bmImage = bmImage;
        }

        protected Bitmap doInBackground(String... urls) {
            String urldisplay = urls[0];
            Bitmap mIcon11 = null;
            try {
                InputStream in = new java.net.URL(urldisplay).openStream();
                mIcon11 = BitmapFactory.decodeStream(in);
            } catch (Exception e) {
                Log.e("Error", e.getMessage());
                e.printStackTrace();
            }
            return mIcon11;
        }

        protected void onPostExecute(Bitmap result) {
            bmImage.setImageBitmap(result);
        }
    }
}

