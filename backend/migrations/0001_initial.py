# Generated by Django 2.2.8 on 2020-01-11 23:02

import backend.validators
from django.conf import settings
import django.contrib.auth.models
import django.contrib.auth.validators
import django.core.validators
from django.db import migrations, models
import django.db.models.deletion
import django.utils.timezone


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('auth', '0011_update_proxy_permissions'),
    ]

    operations = [
        migrations.CreateModel(
            name='CustomUser',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('password', models.CharField(max_length=128, verbose_name='password')),
                ('last_login', models.DateTimeField(blank=True, null=True, verbose_name='last login')),
                ('is_superuser', models.BooleanField(default=False, help_text='Designates that this user has all permissions without explicitly assigning them.', verbose_name='superuser status')),
                ('username', models.CharField(error_messages={'unique': 'A user with that username already exists.'}, help_text='Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only.', max_length=150, unique=True, validators=[django.contrib.auth.validators.UnicodeUsernameValidator()], verbose_name='username')),
                ('first_name', models.CharField(blank=True, max_length=30, verbose_name='first name')),
                ('last_name', models.CharField(blank=True, max_length=150, verbose_name='last name')),
                ('email', models.EmailField(blank=True, max_length=254, verbose_name='email address')),
                ('is_staff', models.BooleanField(default=False, help_text='Designates whether the user can log into this admin site.', verbose_name='staff status')),
                ('is_active', models.BooleanField(default=True, help_text='Designates whether this user should be treated as active. Unselect this instead of deleting accounts.', verbose_name='active')),
                ('date_joined', models.DateTimeField(default=django.utils.timezone.now, verbose_name='date joined')),
                ('user_type', models.PositiveSmallIntegerField(choices=[(1, 'Student'), (2, 'Company'), (3, 'Admin')], default=1)),
                ('groups', models.ManyToManyField(blank=True, help_text='The groups this user belongs to. A user will get all permissions granted to each of their groups.', related_name='user_set', related_query_name='user', to='auth.Group', verbose_name='groups')),
                ('user_permissions', models.ManyToManyField(blank=True, help_text='Specific permissions for this user.', related_name='user_set', related_query_name='user', to='auth.Permission', verbose_name='user permissions')),
            ],
            options={
                'verbose_name': 'user',
                'verbose_name_plural': 'users',
                'abstract': False,
            },
            managers=[
                ('objects', django.contrib.auth.models.UserManager()),
            ],
        ),
        migrations.CreateModel(
            name='Company',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('phone_number', models.CharField(max_length=10, validators=[django.core.validators.RegexValidator(message='Enter your 10 digit phone number without country codes and symbols', regex='^\\d{10}$')])),
                ('poc', models.CharField(default='', max_length=255, verbose_name='person of contact')),
                ('about', models.TextField(max_length=1000)),
                ('logo', models.ImageField(upload_to='')),
                ('user', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Student',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('phone_number', models.CharField(max_length=10, validators=[django.core.validators.RegexValidator(message='Enter your 10 digit phone number without country codes and symbols', regex='^\\d{10}$')])),
                ('student_id', models.CharField(max_length=10)),
                ('gender', models.CharField(choices=[('M', 'Male'), ('F', 'Female'), ('O', 'Other'), ('N', 'Prefer not to say')], max_length=1)),
                ('year_of_study', models.CharField(choices=[('1', 'First Year Undergrad'), ('2', 'Second Year Undergrad'), ('3', 'Third Year Undergrad'), ('4', 'Fourth Year Undergrad'), ('5', 'Postgrads (5th year DD, PG+))')], max_length=1)),
                ('resume', models.FileField(upload_to='', validators=[backend.validators.FileValidator(content_types=('application/pdf',), max_size=52428800)])),
                ('user', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Job',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('job_name', models.CharField(max_length=255)),
                ('description', models.TextField()),
                ('skill', models.TextField(max_length=50, verbose_name='skills required')),
                ('start_date', models.DateField()),
                ('duration', models.IntegerField()),
                ('is_flexi', models.BooleanField(default=False, verbose_name='flexible start and end date')),
                ('stipend', models.IntegerField()),
                ('language', models.CharField(max_length=50, verbose_name='Programming languages')),
                ('is_active', models.BooleanField(default=True)),
                ('company', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='backend.Company')),
            ],
        ),
        migrations.CreateModel(
            name='Application',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('date_of_application', models.DateTimeField(auto_now_add=True)),
                ('select_status', models.CharField(choices=[('RCVD', 'Application received'), ('SCRN', 'Passed screening'), ('INTD', 'Interviewed'), ('ACPT', 'Accepted'), ('RJCT', 'Rejected'), ('FLAG', 'Flagged')], default='RCVD', max_length=4, verbose_name='selection status')),
                ('resume', models.FileField(upload_to='', validators=[backend.validators.FileValidator(content_types=('application/pdf',), max_size=52428800)])),
                ('job', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='backend.Job')),
                ('student', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='backend.Student')),
            ],
        ),
    ]
