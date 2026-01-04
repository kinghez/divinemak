from django.db import models
from PIL import Image

# Create your models here.

class AboutImages(models.Model):
    first_image = models.ImageField(upload_to='about/')
    second_image = models.ImageField(upload_to='about/')


    def resize_images(self):
        img1 = Image.open(self.first_image.path)
        if img1.height != 619 and img1.width != 390:
            output_size = (390, 619)
            img1.thumbnail(output_size)
            img1.save(self.first_image.path)

        img2 = Image.open(self.second_image.path)
        if img2.height != 468 and img2.width != 290:
            output_size = (290, 468)
            img2.thumbnail(output_size)
            img2.save(self.second_image.path)



class HomeServiceCard(models.Model):
    icon = models.CharField(max_length=100)
    title = models.CharField(max_length=100)
    description = models.TextField()

    def __str__(self):
        return self.title



class HomeProjectLoader(models.Model):
    id = models.AutoField(primary_key=True)
    text   = models.CharField(max_length=100)
    delay  = models.IntegerField()
    stop = models.IntegerField()
    duration = models.IntegerField()
    speed = models.IntegerField()

    def __str__(self):
        return self.text
    

class HomeWhyChooseUs(models.Model):
    title = models.CharField(max_length=100)
    short_description = models.TextField()

    feature_icon = models.CharField(max_length=100)
    feature_title = models.CharField(max_length=100)
    feature_description = models.TextField()

    def __str__(self):
        return self.title
    

class HomeOurPackages(models.Model):
    id = models.AutoField(primary_key=True)
    package_name = models.CharField(max_length=100)
    price = models.CharField(max_length=100)
    item1 = models.CharField(max_length=100)
    item2 = models.CharField(max_length=100)
    item3 = models.CharField(max_length=100)
    item4 = models.CharField(max_length=100)
    item5 = models.CharField(max_length=100)

    def __str__(self):
        return self.package_name
    

class HomeTeamMember(models.Model):
    id = models.AutoField(primary_key=True)
    image = models.ImageField(upload_to='team/')
    name = models.CharField(max_length=100)
    position = models.CharField(max_length=100)
    facebook = models.URLField()
    twitter = models.URLField()
    linkedin = models.URLField()
    youTube = models.URLField()

    """ def resize_images(self):
        img = Image.open(self.image.path)
        if img.height != 60 and img.width != 60:
            output_size = (60,60)
            img.thumbnail(output_size, Image.Resampling.LANCZOS)
            img.save(self.image.path)

    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)
        self.resize_images() """

    def __str__(self):
        return self.name
    



    
    
class HomeFaq(models.Model):
    id = models.AutoField(primary_key=True)
    question = models.CharField(max_length=200)
    answer = models.TextField()

    def __str__(self):
        return self.question
    
class HomeTestimonial(models.Model):
    id = models.AutoField(primary_key=True)
    client_image = models.ImageField(upload_to='testimonials/')
    client_name = models.CharField(max_length=100)
    client_position = models.CharField(max_length=100)
    feedback = models.TextField()

    def __str__(self):
        return self.client_name