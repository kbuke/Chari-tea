#!/usr/bin/env python3

# Standard library imports
from random import randint, choice as rc

# Remote library imports
from faker import Faker

# Local imports
from app import app
from models import Charity, User, Donation, CharityReview, BlogPost
from config import db

fake = Faker()

if __name__ == '__main__':
    with app.app_context():
        print("Starting seed...")

        db.drop_all()
        db.create_all()

        print("Seeding User information...")
        kbuke13 = User(
            username="kbuke13",
            user_icon = "https://www.nylabone.com/-/media/project/oneweb/nylabone/images/dog101/activities-fun/10-great-small-dog-breeds/maltese-portrait.jpg",
            email="kabuke13@gmail.com"
        )
        kbuke13.password_hash = "kara1328"

        zhirji15 = User(
            username="zhirji15",
            user_icon="https://www.princeton.edu/sites/default/files/styles/1x_full_2x_half_crop/public/images/2022/02/KOA_Nassau_2697x1517.jpg?itok=Bg2K7j7J",
            email= "zhirji15@gmail.com"
        )
        zhirji15.password_hash = "louisBruce"

        gbuke02 = User(
            username="gbuke64",
            user_icon="https://i.guim.co.uk/img/media/21d2cabce7b5bef6b78aefd75e24601f00ecbfde/0_218_1536_922/master/1536.jpg?width=1200&height=1200&quality=85&auto=format&fit=crop&s=4a969f37e0059872477d10d9d4248ccb",
            email="gbuke02@gmail.com"
        )
        gbuke02.password_hash = "hello"

        abuke28 = User(
            username="abuke28",
            user_icon="https://ichef.bbci.co.uk/news/480/cpsprodpb/151F8/production/_128502568_whatsappimage2023-02-02at13.45.43.jpg.webp",
            email="abuke28@gmail.com"
        )
        abuke28.password_hash = "ismell"

        vbuke07 = User(
            username="vbuke07",
            user_icon="https://hips.hearstapps.com/hmg-prod/images/small-fluffy-dog-breeds-maltipoo-66300ad363389.jpg?crop=0.668xw:1.00xh;0.151xw,0&resize=640:*",
            email="vbuke07@gmail.com"
        )
        vbuke07.password_hash="hi"

        kmcror11 = User(
            username="kmcror11",
            user_icon="https://d3544la1u8djza.cloudfront.net/APHI/Blog/2021/07-06/small+white+fluffy+dog+smiling+at+the+camera+in+close-up-min.jpg",
            email="kmcror11@gmail.com"
        )
        kmcror11.password_hash="by"

        jhirji = User(
            username="jhirji",
            user_icon="https://images.aeonmedia.co/images/acd6897d-9849-4188-92c6-79dabcbcd518/essay-final-gettyimages-685469924.jpg?width=3840&quality=75&format=auto",
            email="jhirji@gmail.com"
        )
        jhirji.password_hash="bye"

        db.session.add_all([kbuke13, zhirji15, gbuke02, abuke28, vbuke07, kmcror11, jhirji])
        db.session.commit()

        print("Seeding Charities...")
        solving7 = Charity(
            charity_name="Solving7",
            charity_description="Making school desks for underfunded schools in South Africa from number 7 plastics",
            charity_location="Johannesburg, South Africa",
            charity_icon="https://media.licdn.com/dms/image/C4D0BAQF-AXUWrPPoqw/company-logo_200_200/0/1630554770346?e=2147483647&v=beta&t=M474TLimXMbye8PmeLAQ1MtkBzFWVswJ0SCHDCJ0x5g"
        )
        solving7.password_hash="solving71"

        unicef = Charity(
            charity_name="Unicef",
            charity_description="Provides humanitarian aid for children globally",
            charity_location="New York, USA",
            charity_icon = "https://www.un.org/youthenvoy/wp-content/uploads/2014/09/unicef_twitter1.png"
        )
        unicef.password_hash="unicef1"

        wwf = Charity(
            charity_name="WWF",
            charity_description="Helping endangered wildlife survive",
            charity_location="New York, USA",
            charity_icon = "https://miro.medium.com/v2/resize:fit:2400/1*8BESPUAu2wa47d2gw10cgQ.jpeg"
        )
        wwf.password_hash="wwf1"

        shooting_Star = Charity(
            charity_name="Shooting Star",
            charity_description="Supporting families with terminally ill children",
            charity_location="London, UK",
            charity_icon="https://www.shootingstar.org.uk/app/uploads/2023/09/websitereversednewlogo2.png"
        )
        shooting_Star.password_hash="shootingstar1"

        db.session.add_all([solving7, unicef, wwf, shooting_Star])
        db.session.commit()


        print("Seeding Donations")
        kbuke13_donation = Donation(
            amount_donated=5.34,
            charity_id=1,
            user_id=1
        )

        kbuke13_donation2 = Donation(
            amount_donated=10.00,
            charity_id=2,
            user_id=1
        )

        zhirji15_donation = Donation(
            amount_donated=10.00,
            charity_id=1,
            user_id=2
        )

        gbuke02_donation = Donation(
            amount_donated=50.00,
            charity_id=1,
            user_id=3
        )

        abuke28_donation = Donation(
            amount_donated=0.98,
            charity_id = 1,
            user_id=4
        )

        vbuke07_donation = Donation(
            amount_donated=10,
            charity_id=1,
            user_id=5
        )

        kmcror11_donation = Donation(
            amount_donated=15,
            charity_id=1,
            user_id=6
        )

        jhirji_donation = Donation(
            amount_donated=100,
            charity_id=1,
            user_id=7
        )

        vbuke07_donation_two = Donation(
            amount_donated=100000,
            charity_id=3,
            user_id=5
        )

        db.session.add_all([kbuke13_donation, kbuke13_donation2, zhirji15_donation, gbuke02_donation, abuke28_donation, vbuke07_donation, kmcror11_donation, jhirji_donation, vbuke07_donation_two])
        db.session.commit()

        print("Seeding Reviews")
        s7_review = CharityReview(
            review_title = "Best Desks in Town",
            charity_review="Great desks, really helped my shcools education",
            charity_id=1,
            user_id=1
        )

        unicef_review = CharityReview(
            review_title = "Delivered Aid Brilliantly",
            charity_review="Really helped in a dire situation. Very thankful for them",
            charity_id=2,
            user_id=1
        )
        db.session.add_all([s7_review, unicef_review])
        db.session.commit()

        print("Seeding Blogs")
        s7Blog = BlogPost(
            blog_title="The Difficulty of Making Desks",
            blog_content="Test Difficulty",
            cover_img="https://solving7.green/wp-content/uploads/2020/11/DSC8314.jpg",
            blog_views = 25,
            charity_id=1
        )

        s7Blog2 = BlogPost(
            blog_title="The Inspiration for our Desks",
            blog_content="Hello Inspiration",
            cover_img="https://www.unicef.org/croatia/sites/unicef.org.croatia/files/styles/media_large_image/public/%C2%A9%20UNICEF_UN0231191_Ramasomanana.jpg.webp?itok=_MVuhCVk",
            blog_views=20,
            charity_id=1
        )

        s7Blog3 = BlogPost(
            blog_title="ThirD Test",
            blog_content="show up",
            cover_img="https://www.unicef.org/southafrica/sites/unicef.org.southafrica/files/styles/hero_tablet/public/ZAF-REAL-SA-KZN-25-1222.jpg.webp?itok=AghFfnIU",
            blog_views=0,
            charity_id=1
        )

        unicefBlog = BlogPost(
            blog_title="1st Post",
            blog_content="hi",
            cover_img="https://www.unicef.org/sites/default/files/styles/hero_mobile/public/UN0310595-bluewash.jpg.webp?itok=fxCr4aYg",
            blog_views=100,
            charity_id=2
        )

        wwfBlog = BlogPost(
            blog_title="Saving Animals",
            blog_content="hello again",
            cover_img="https://c402277.ssl.cf1.rackcdn.com/photos/3140/images/original/Panda_257801_Home-Sockjpg.jpg?1356003605",
            blog_views=100000,
            charity_id=3
        )

        shootingStarBlog = BlogPost(
            blog_title="What can be done?",
            blog_content="test",
            cover_img="https://www.shootingstar.org.uk/app/uploads/2022/10/Evie-Hospice-respite-stay-2022-1024x600.jpg",
            blog_views=200000000,
            charity_id=4
        )

        unicefBlog2=BlogPost(
            blog_title="More Blogs",
            blog_content="another test",
            cover_img="https://www.unicef.org/wca/sites/unicef.org.wca/files/styles/hero_mobile/public/UN0487642.JPG.webp?itok=6jayLRGo",
            blog_views=15,
            charity_id=2
        )

        kbuke13_blog2 = BlogPost(
            blog_title="Hi",
            blog_content="mehhhh",
            cover_img="https://static.independent.co.uk/2023/03/17/01/Iraq_War_Anniversary_20393.jpg?quality=75&width=640&height=614&fit=bounds&format=pjpg&crop=16%3A9%2Coffset-y0.5&auto=webp",
            blog_views=20,
            user_id=1
        )

        zhirji15_blog = BlogPost(
            blog_title="I love my boyfriend",
            blog_content="hes the best",
            cover_img="https://i.ytimg.com/vi/vbz8-xSXfzQ/sddefault.jpg",
            blog_views=100000000,
            user_id=2
        )

        gbuke64_blog = BlogPost(
            blog_title="My son is way better than my daughter",
            blog_content="Alara isn't cool",
            cover_img="https://martockclass5.weebly.com/uploads/4/3/0/0/43008713/5791663_orig.jpg",
            blog_views=20000000,
            user_id=3
        )

        abuke28_blog = BlogPost(
            blog_title="My Brother is my hero",
            blog_content="He's awesome",
            cover_img="https://i.pinimg.com/originals/71/d3/6a/71d36abaa8206d82a8e6f2a0a97aa934.jpg",
            blog_views=5,
            user_id=4
        )

        vbuke07_blog=BlogPost(
            blog_title="My son the king",
            blog_content="Kaan is the best",
            cover_img="https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1567199149l/52810836.jpg",
            blog_views=100,
            user_id=5
        )

        kmcror11_blog=BlogPost(
            blog_title="My brother in law is too cool",
            blog_content="Kaan just rules",
            cover_img="https://cdn3.vectorstock.com/i/1000x1000/30/57/gifts-for-brother-in-law-you-are-best-vector-28603057.jpg",
            blog_views=1000,
            user_id=6
        )
        db.session.add_all([s7Blog, s7Blog2, s7Blog3, unicefBlog, wwfBlog, shootingStarBlog, kbuke13_blog2, unicefBlog2, zhirji15_blog, kmcror11_blog, vbuke07_blog, abuke28_blog, gbuke64_blog])
        db.session.commit()

        print("Seeding complete!")


